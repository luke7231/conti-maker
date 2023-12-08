import { useRef, useState } from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import { YouTubePlayer } from "youtube-player/dist/types";
import styled from "styled-components";

interface Keyword {
    icon: string;
    title: string;
}
const data = [
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
        icon: "💜",
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
const Title = styled.div`
    font-size: 24px;
    font-weight: 500;
    padding-left: 24px;
    padding-top: 24px;
    color: #fff;
`;
const SubTitle = styled.div`
    font-size: 16px;
    padding: 10px 0 0 24px;
    color: gray;
`;
const GridWrap = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 12px;

    @media (min-width: 767px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    padding: 24px;
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
const Home = () => {
    const playerRef = useRef<YouTube>(null);
    const [opts, setOpts] = useState<YouTubeProps["opts"]>({
        height: "400",
        width: "640",
        playerVars: {
            start: 10,
        },
    });
    const [player, setPlayer] = useState<YouTubePlayer | null>(null);
    const [selectedKeywords, setSelectedKeywords] = useState<Keyword[]>([]);
    const onReady = (event: YouTubeEvent) => {
        // onReady 이벤트 핸들러에서 YouTube 플레이어 객체를 가져와 상태로 저장합니다.
        setPlayer(event.target);
    };

    const handleSeekTo30Seconds = () => {
        // 플레이어가 준비된 상태에서 seekTo 메서드를 사용하여 특정 시간으로 이동합니다.
        if (player) {
            console.log(player);
            player.seekTo(20, true);
            player.playVideo();
        }
    };
    const handleMemberClick = (keyword: Keyword) => {
        const isMemberSelected = selectedKeywords.includes(keyword);
        setSelectedKeywords((prevselectedKeywords) =>
            isMemberSelected
                ? prevselectedKeywords.filter((selectedKeywords) => selectedKeywords !== keyword)
                : [...prevselectedKeywords, keyword],
        );
    };
    console.log(selectedKeywords);
    return (
        <div>
            {/* <YouTube ref={playerRef} onReady={onReady} videoId="HHupVXtnjRs" opts={opts} /> */}
            {/* <button onClick={handleSeekTo30Seconds}>0:20</button> */}
            <Title>키워드를 골라주세요!</Title>
            <SubTitle>주제에 맞는 찬양들을 추천해줘요</SubTitle>
            <GridWrap>
                {data.map((menu) => {
                    return (
                        <Item onClick={() => handleMemberClick(menu)} isSelected={selectedKeywords.includes(menu)}>
                            <Icon>{menu.icon}</Icon>
                            <Keyword>{menu.title}</Keyword>
                        </Item>
                    );
                })}
            </GridWrap>
        </div>
    );
};

export default Home;
