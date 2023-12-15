import { useRef, useState } from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import { YouTubePlayer } from "youtube-player/dist/types";
import styled from "styled-components";
import { getAll } from "../../api/supabase";
import { useNavigate } from "react-router-dom";

interface Keyword {
    icon: string;
    title: string;
}
export const SONG_KEYWORDS = [
    {
        icon: "✝️",
        title: "고백",
    },
    {
        icon: "🎶",
        title: "찬양",
    },
    {
        icon: "💪",
        title: "위로",
    },

    {
        icon: "💓",
        title: "사랑",
    },
    {
        icon: "😌",
        title: "감사",
    },
    {
        icon: "🤲",
        title: "축복",
    },
    {
        icon: "🌈",
        title: "은혜",
    },
    {
        icon: "🙏",
        title: "간구",
    },
];
const Container = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
`;
const Content = styled.div`
    margin-top: 3rem;
    width: 100%;
    height: 100%;
    max-width: 40rem;
    // max-height: 40rem;
    background-color: #fff;
    border-radius: 36px;
    overflow-y: scroll;
    // text-align: center;
`;
const Title = styled.div`
    font-size: 24px;
    font-weight: 800;
    // padding-left: 3rem;
    padding-top: 3rem;
    color: #111;
`;
const SubTitle = styled.div`
    font-size: 16px;
    // padding-left: 3rem;
    margin-top: 10px;
    color: gray;
    font-weight: 600;
`;
const GridWrap = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 3rem;
    grid-gap: 12px;

    @media (min-width: 767px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
`;
const Item = styled.div<{ isSelected: boolean }>`
    border: ${({ isSelected }) => (isSelected ? "2px solid #999" : "")};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    aspect-ratio: 1;
    border-radius: 26px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
`;
const Icon = styled.div`
    font-size: 20px;
`;
const Keyword = styled.div`
    margin-top: 12px;
    font-size: 16px;
    font-weight: 600;
    color: #000;
`;
const Submit = styled.div`
    width: 90%;
    height: 48px;
    position: fixed;
    bottom: 12px;
    color: #111;
    background-color: #ff006e;
    opacity: 0.8;
    border-radius: 12px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
`;
const Home = () => {
    // const playerRef = useRef<YouTube>(null);
    // const [opts, setOpts] = useState<YouTubeProps["opts"]>({
    //     height: "400",
    //     width: "640",
    //     playerVars: {
    //         start: 10,
    //     },
    // });
    // const [player, setPlayer] = useState<YouTubePlayer | null>(null);
    const navigate = useNavigate();
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

    // const onReady = (event: YouTubeEvent) => {
    //     // onReady 이벤트 핸들러에서 YouTube 플레이어 객체를 가져와 상태로 저장합니다.
    //     setPlayer(event.target);
    // };
    console.log(selectedKeywords);
    // const handleSeekTo30Seconds = () => {
    //     // 플레이어가 준비된 상태에서 seekTo 메서드를 사용하여 특정 시간으로 이동합니다.
    //     if (player) {
    //         console.log(player);
    //         player.seekTo(20, true);
    //         player.playVideo();
    //     }
    // };
    const handleMemberClick = (keyword: string) => {
        const isMemberSelected = selectedKeywords.includes(keyword);
        setSelectedKeywords((prevselectedKeywords) =>
            isMemberSelected
                ? prevselectedKeywords.filter((selectedKeywords) => selectedKeywords !== keyword)
                : [...prevselectedKeywords, keyword],
        );
    };
    const onClickComplete = (keywords: string[]) => {
        navigate("/result", {
            state: {
                keywords,
            },
        });
    };
    return (
        <Container>
            <Title>키워드를 선택해주세요!</Title>
            <SubTitle>주제에 맞는 찬양들을 추천해줘요</SubTitle>
            <Content>
                {/* <button onClick={handleSeekTo30Seconds}>0:20</button> */}

                <GridWrap>
                    {SONG_KEYWORDS.map((menu) => {
                        return (
                            <Item
                                onClick={() => handleMemberClick(menu.title)}
                                isSelected={selectedKeywords.includes(menu.title)}
                            >
                                <Icon>{menu.icon}</Icon>
                                <Keyword>{menu.title}</Keyword>
                            </Item>
                        );
                    })}
                </GridWrap>
                <Submit onClick={() => (selectedKeywords.length === 0 ? null : onClickComplete(selectedKeywords))}>
                    완료
                </Submit>
            </Content>
        </Container>
    );
};

export default Home;
