import React from "react";
import styled, { keyframes } from "styled-components";
import Loader from "./loader";

const fadeInFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// styled.div에 keyframes를 적용하여 스타일을 정의합니다.
const AnimatedText = styled.div`
    opacity: 0;
    transform: translateY(20px);
    animation: ${fadeInFromTop} 1s ease-out forwards;
    color: #111;
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 36px;
`;

const FullScreenLoading = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Loader />
            <AnimatedText>찬양을 불러오는 중이에요.</AnimatedText>
        </div>
    );
};
export default FullScreenLoading;
