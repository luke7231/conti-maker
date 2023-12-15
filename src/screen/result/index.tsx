/* eslint-disable import/no-unresolved */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getByKeyword } from "../../api/supabase";
import { useLocation } from "react-router-dom";
import { Conti } from "../../types/supabase";
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube";
import { SONG_KEYWORDS } from "../home";

const Container = styled.div``;
const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 48px;
`;
const Title = styled.div`
    font-size: 24px;
    font-weight: 500;
    padding-left: 24px;
    padding-top: 24px;
    color: #fff;
`;
const Wrapper = styled.div`
    text-align: center;
`;
const Contis = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x: scroll;

    padding: 24px;
    text-align: start;
    margin-bottom: 48px;
`;
const Keyword = styled.div`
    color: #111;
    font-weight: 600;
    font-size: 24px;
    margin: 10px 0;
`;
const PartitionWrap = styled.div`
    width: 100%;
    // padding: 0 36px;
    // margin-top: 20px;
    display: flex;
    justify-content: center;
`;
const Partition = styled.div`
    width: 100%;
    border-top: 1px solid #999;
`;
const Song = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const SongTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #111;
    padding-left: 4px;
`;
const Image = styled.img`
    height: 420px;
    object-fit: contain;
    border-radius: 26px;
    margin-top: 24px;
    // border: 1px solid #999;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.35);
`;
const NoImage = styled.div`
    height: 420px;
    width: 300px;
    background: #fff;
    border-radius: 26px;
    margin-top: 24px;
    // border: 1px solid #999;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    text-align: center;
    line-height: 20px;
    color: #000;
`;
const VideoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 24px;
`;
const ViController = styled.div``;
const Shortcut = styled.div`
    color: #111;
`;

const getYoutubeVideoId = (youtubeUrl: string) => {
    const regex = /youtu\.be\/([^?]+)/;
    const match = youtubeUrl.match(regex);

    if (match) {
        const videoCode = match[1];
        return videoCode;
    } else {
        console.error("Invalid YouTube URL");
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
        height: "200",
        width: "100%",
    });
    const [players, setPlayers] = useState<{ [key: string]: YouTubePlayer }>({});

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

    const onVideoReady = (index: number) => (event: YouTubeEvent) => {
        setPlayers((prevPlayers) => ({
            ...prevPlayers,
            [index]: event.target,
        }));
    };
    const handleSeekTo = (index: number, seekTo: number) => {
        console.log(players);
        if (players[index]) {
            players[index].seekTo(seekTo, true);
            players[index].playVideo();
        }
    };

    return (
        <Container>
            <Title>콘티가 완성되었어요!</Title>
            <Content>
                {data &&
                    Object.entries(data).map(([keyword, contis]) => {
                        return (
                            <Wrapper>
                                <PartitionWrap>
                                    <Partition />
                                </PartitionWrap>
                                <Keyword>
                                    {keyword} {findIconByTitle(keyword)}
                                </Keyword>
                                <PartitionWrap>
                                    <Partition />
                                </PartitionWrap>
                                <Contis>
                                    {contis.map((menu, index) => {
                                        return (
                                            <div style={{ marginRight: 24 }}>
                                                <Song>
                                                    <SongTitle>
                                                        {index + 1}.{" " + menu.title}
                                                    </SongTitle>
                                                    {menu.img ? (
                                                        <Image src={menu.img || ""} />
                                                    ) : (
                                                        <NoImage>
                                                            {"죄송합니다"}
                                                            <br />
                                                            {"아직 악보가 없습니다!"}
                                                        </NoImage>
                                                    )}
                                                    {/* <Image src={menu.img || ""} /> */}
                                                </Song>

                                                {menu.youtube_link ? (
                                                    <VideoWrapper>
                                                        <div
                                                            style={{
                                                                borderRadius: 20,
                                                                padding: 10,
                                                                background: "#fff",
                                                                overflow: "hidden",
                                                                // background: "pink",
                                                            }}
                                                        >
                                                            <YouTube
                                                                // style={{ minWidth: 320 }}
                                                                // ref={playerRef}
                                                                onReady={onVideoReady(index)}
                                                                videoId={getYoutubeVideoId(menu.youtube_link)}
                                                                opts={opts}
                                                            />
                                                        </div>
                                                        <ViController>
                                                            {menu.verse ? (
                                                                <Shortcut
                                                                    onClick={() =>
                                                                        handleSeekTo(index, menu.verse as number)
                                                                    }
                                                                >
                                                                    {menu.verse}
                                                                </Shortcut>
                                                            ) : null}
                                                        </ViController>
                                                    </VideoWrapper>
                                                ) : null}
                                            </div>
                                        );
                                    })}
                                </Contis>
                            </Wrapper>
                        );
                    })}
            </Content>
        </Container>
    );
};

export default Result;
