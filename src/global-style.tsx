import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { getResponsiveMaxWidth } from "./utils/layout-util";

const GlobalStyle = createGlobalStyle`
    ${reset}
    :root {
        height: 100%;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 14px;
        vertical-align: baseline;
    }
    body{
        line-height: 1;
        font-family: Pretendard;
      
        background-color: rgb(241 245 249);
        color: #fff;
        
        margin-bottom: 100px;
        
        ::-webkit-scrollbar {
          display: none;
      }
      
        touch-action: pan-y;
      
    }
    body.modal-open {
      overflow: hidden;
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
    .Toastify__toast-container {
        min-height: 48px;
        width: 100%;
        ${getResponsiveMaxWidth()}
        position: fixed;
        bottom: 57px;
        pointer-events: none;
      }
    
      .Toastify__toast {
        min-height: 48px;
      }
    
      .Toastify__toast-body {
      }
    
      .Toastify__progress-bar {
        display: gray;
      }
    
      .Toastify__close-button {
        align-self: initial;
      }
    
      .otl_tostify {
        ${getResponsiveMaxWidth()}
        background-color: rgba(34, 34, 34, 0.9);
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
        border-radius: 8px;
        min-height: 48px;
        color: white;
        font-size: 14px;
        text-align: center;
      }
    
      .not-scroll {
        overflow: hidden;
      }
    
      .otl_tostify_error {
        ${getResponsiveMaxWidth()}
        background-color: #e74c3c;
        background-color: rgba(231, 76, 60, 0.9);
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 8px;
        min-height: 48px;
        color: white;
        font-size: 14px;
        text-align: center;
      }
      }
`;

export default GlobalStyle;
