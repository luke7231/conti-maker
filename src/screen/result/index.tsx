/* eslint-disable import/no-unresolved */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getByKeyword } from "../../api/supabase";
import { useLocation } from "react-router-dom";
import { Conti } from "../../types/supabase";
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube";
import { SONG_KEYWORDS } from "../home";
import XCloseButtonImg from "../../images/x_close.png";
import FullScreenLoading from "./full-screen-loading";

const Container = styled.div`
    height: 100%;
    overflow: scroll;
    padding: 3rem;
    @media (max-width: 767px) {
        padding: 1rem;
        padding-top: 3rem;
    }
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
`;
const Title = styled.div`
    font-size: 2rem;
    font-weight: 900;
    color: #111;
    text-align: center;
    margin-bottom: 3rem;
    @media (max-width: 767px) {
        font-size: 1.5rem;
    }
`;
const Wrapper = styled.div`
    background-color: #fff;
    border-radius: 45px;
    width: 100%;
    display: grid;
    margin-bottom: 5rem;
`;
const ContiList = styled.div`
    overflow: hidden;
    width: 100%;
`;
const Contis = styled.div`
    display: flex;
    overflow-x: scroll;
    padding: 2rem;
    text-align: start;
    margin-bottom: 48px;
`;
const Keyword = styled.div`
    color: #111;
    font-weight: 800;
    font-size: 2.5rem;
    margin-left: 36px;
    margin-top: 36px;

    @media (max-width: 767px) {
        font-size: 2rem;
    }
`;
const Song = styled.div<{ loaded: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: ${({ loaded }) => (loaded ? 1 : 0)};
    transition: opacity 0.5s ease-in-out;
    transform: translateY(${({ loaded }) => (loaded ? 0 : "20px")});
`;

const SongTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 400;
    color: #111;
    padding-left: 4px;
`;
const Image = styled.img`
    height: 24rem;
    object-fit: contain;
    margin-top: 24px;
    padding: 12px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.35);
`;
const NoImage = styled.div`
    height: 420px;
    width: 300px;
    background: #fff;
    margin-top: 24px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    text-align: center;
    line-height: 20px;
    color: #000;
`;

const OuterContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;
const SidePannel = styled.div`
    display: flex;
    width: 340px;
    height: 100%;
    background-color: rgb(248 250 252);
    position: sticky;

    @media (max-width: 767px) {
        display: none;
    }
`;
const Button = styled.button<{ color: string }>`
    // background-color: ${({ color }) => (color ? color : "#111")};
    // background: linear-gradient(to right, #ff006e, rgba(0, 0, 0, 0.1));
    background: #ff006e;
    padding: 12px;
    // width: 100px;
    color: #fff;
    border-radius: 10px;
    margin-top: 12px;
    font-weight: 900;
`;
const getYoutubeVideoId = (youtubeUrl: string) => {
    const regex = /youtu\.be\/([^?]+)/;
    const match = youtubeUrl.match(regex);

    if (match) {
        const videoCode = match[1];
        return videoCode;
    } else {
        console.error("Invalid YouTube URL");
        return "";
    }
};

function findIconByTitle(titleToFind: string) {
    const foundItem = SONG_KEYWORDS.find((item) => item.title === titleToFind);

    if (foundItem) {
        return foundItem.icon;
    } else {
        return "아이콘이 없습니다.";
    }
}

const Result = () => {
    const location = useLocation();
    const keywords = location.state.keywords as string[];
    const [data, setdata] = useState<{ [keyword: string]: Conti[] } | null>();
    const [opts] = useState<YouTubeProps["opts"]>({
        width: "100%",
    });
    const [player, setPlayer] = useState<YouTubePlayer>();
    const [selectedSong, setSelectedSong] = useState<Conti>();
    const [isOpenFullScreen, setIsOpenFullScreen] = useState({ isOpen: false, img: "", youtubeId: "" });
    useEffect(() => {
        const fetchSongsByKeywords = async () => {
            if (keywords) {
                const newData: { [keyword: string]: Conti[] } = {};

                await Promise.all(
                    keywords.map(async (key: string) => {
                        const { data, error } = await getByKeyword({ keyword: key });

                        if (!error) {
                            newData[key] = data as Conti[]; // 타입 단언 (Type Assertion)
                        } else {
                            console.error(`Error fetching songs for keyword ${key}:`, error);
                        }
                    }),
                );

                setdata(newData);
            }
        };
        fetchSongsByKeywords();
    }, []);

    // 모달 열리면 뒤 스크롤 제거.
    useEffect(() => {
        // Add or remove the 'modal-open' class to the body based on the modal state
        if (isOpenFullScreen.isOpen) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("modal-open");
        };
    }, [isOpenFullScreen.isOpen]);
    const onVideoReady = (event: YouTubeEvent) => {
        setPlayer(event.target);
    };
    const handleSeekTo = (seekTo: number) => {
        if (player) {
            player.seekTo(seekTo, true);
            player.playVideo();
        }
    };

    const openFullScreen = (img: string, youtubeId: string) => {
        setIsOpenFullScreen({ isOpen: true, img, youtubeId });
    };
    const closeFullScreen = () => {
        setIsOpenFullScreen({ isOpen: false, img: "", youtubeId: "" });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stopPropagation = (e: any) => {
        e.stopPropagation();
    };
    useEffect(() => {
        if (selectedSong?.etc) {
            console.log(selectedSong.etc);
            try {
                const keyValuePairs = Object.entries(selectedSong.etc).map(([key, value]) => ({ [key]: value }));
                console.log(keyValuePairs);
            } catch (error) {
                console.log(error);
            }
        }
    }, [selectedSong]);
    const [loadedImages, setLoadedImages] = useState(Array(5).fill(false));

    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => {
            const updatedImages = [...prev];
            updatedImages[index] = true;
            return updatedImages;
        });
    };
    return (
        <>
            {!data && <FullScreenLoading />}
            <Container>
                <OuterContainer>
                    <Content>
                        <Title>콘티가 완성되었어요!</Title>
                        {data &&
                            Object.entries(data).map(([keyword, contis]) => {
                                return (
                                    <Wrapper>
                                        <Keyword>
                                            {keyword}
                                            {findIconByTitle(keyword)}
                                        </Keyword>
                                        <ContiList>
                                            <Contis>
                                                {contis.map((menu, index) => {
                                                    return (
                                                        <div style={{ marginRight: 24 }}>
                                                            <Song loaded={loadedImages[index]}>
                                                                <SongTitle>
                                                                    {index + 1}.{" " + menu.title}
                                                                </SongTitle>
                                                                {menu.img ? (
                                                                    <div style={{ position: "relative" }}>
                                                                        <Image
                                                                            src={menu.img || ""}
                                                                            onLoad={() => handleImageLoad(index)}
                                                                            // loaded={loadedImages[index]}
                                                                            alt={`Menu Image ${index + 1}`}
                                                                        />

                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                flexDirection: "column",
                                                                            }}
                                                                        >
                                                                            <Button
                                                                                color="#111"
                                                                                onClick={() => {
                                                                                    const videoId = menu.youtube_link
                                                                                        ? getYoutubeVideoId(
                                                                                              menu.youtube_link,
                                                                                          )
                                                                                        : "";
                                                                                    const image = menu.img || "";
                                                                                    openFullScreen(image, videoId);
                                                                                    setSelectedSong(menu);
                                                                                }}
                                                                            >
                                                                                {/* <Expand color="#fff" /> */}
                                                                                OPEN
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <NoImage>
                                                                        {"죄송합니다"}
                                                                        <br />
                                                                        {"아직 악보가 없습니다!"}
                                                                    </NoImage>
                                                                )}
                                                                {/* <Image src={menu.img || ""} /> */}
                                                            </Song>
                                                        </div>
                                                    );
                                                })}
                                            </Contis>
                                        </ContiList>
                                    </Wrapper>
                                );
                            })}
                    </Content>
                </OuterContainer>
                {isOpenFullScreen.isOpen && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <FullScreenBackDrop onClick={closeFullScreen} />
                        <CloseButton src={XCloseButtonImg} onClick={closeFullScreen} />
                        <FullScreenContainer onClick={(e) => stopPropagation(e)}>
                            <FullScreenContent>
                                <VideoWrapper>
                                    <YouTube onReady={onVideoReady} videoId={isOpenFullScreen.youtubeId} opts={opts} />
                                    <ViController>
                                        {selectedSong?.verse ? (
                                            <ShortcutWrap>
                                                <ShortcutTitle>verse</ShortcutTitle>
                                                <Shortcut onClick={() => handleSeekTo(selectedSong.verse as number)}>
                                                    {selectedSong.verse}
                                                </Shortcut>
                                            </ShortcutWrap>
                                        ) : null}
                                        {selectedSong?.["pre-corus"] ? (
                                            <ShortcutWrap>
                                                <ShortcutTitle>pre-corus</ShortcutTitle>
                                                <Shortcut
                                                    onClick={() => handleSeekTo(selectedSong["pre-corus"] as number)}
                                                >
                                                    {selectedSong["pre-corus"]}
                                                </Shortcut>
                                            </ShortcutWrap>
                                        ) : null}
                                        {selectedSong?.highlight ? (
                                            <ShortcutWrap>
                                                <ShortcutTitle>corus</ShortcutTitle>
                                                <Shortcut
                                                    onClick={() => handleSeekTo(selectedSong.highlight as number)}
                                                >
                                                    {selectedSong.highlight}
                                                </Shortcut>
                                            </ShortcutWrap>
                                        ) : null}
                                        {selectedSong?.bridge ? (
                                            <ShortcutWrap>
                                                <ShortcutTitle>bridge</ShortcutTitle>
                                                <Shortcut onClick={() => handleSeekTo(selectedSong.bridge as number)}>
                                                    {selectedSong.bridge}
                                                </Shortcut>
                                            </ShortcutWrap>
                                        ) : null}
                                        {selectedSong?.etc
                                            ? Object.entries(selectedSong.etc).map(([key, value]) => (
                                                  <ShortcutWrap>
                                                      <ShortcutTitle>{key}</ShortcutTitle>
                                                      <Shortcut onClick={() => handleSeekTo(value)}>{value}</Shortcut>
                                                  </ShortcutWrap>
                                              ))
                                            : null}
                                    </ViController>
                                </VideoWrapper>
                                <FullScreenImg src={isOpenFullScreen.img as string} />
                            </FullScreenContent>
                        </FullScreenContainer>
                    </div>
                )}
            </Container>
        </>
    );
};

export default Result;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75); /* 어두운 배경 색상 및 투명도 조절 */
    z-index: 1; /* 모달 위로 배치 */
    overflow: scroll;
`;
const FullScreenContainer = styled.div`
    position: fixed;
    width: 100%;
    padding: 20px;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.7);
    font-size: 15px;
    font-weight: 600;
`;
const FullScreenContent = styled.div`
    overflow: scroll;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;
    padding-top: 2.5rem;

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;
const FullScreenBackDrop = styled(Backdrop)``;
const FullScreenImg = styled.img`
    width: 100%;
    border-radius: 12px;
`;
const CloseButton = styled.img`
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    margin: 24px 24px 0 24px;
    z-index: 3;
    font-weight: 700;
    width: 1.5rem;
    height: 1.5rem;
`;

const VideoWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const ViController = styled.div`
    display: flex;
`;
const ShortcutWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 8px;
`;
const Shortcut = styled.div`
    background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경 색상 및 투명도 조절 */
    color: #ff006e;
    font-weight: 900;
    border: 1px solid #fff;
    padding: 0.5rem 1.5rem;
    border-radius: 18px;
`;

const ShortcutTitle = styled.div`
    color: #fff;
    font-weight: 400;
`;
