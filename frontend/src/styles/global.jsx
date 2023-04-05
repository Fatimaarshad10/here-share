import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
.wrapper {
    margin: auto;
    max-width: 400px;
    text-align: center;
  }

  .container {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 10px;
  }

  .upload-container {
    background-color: rgb(239, 239, 239);
    border-radius: 6px;
    padding: 5px;
  }

  .border-container {
    border: 5px dashed #0F3D39 ;
    padding: 20px;
  }
  .icons {
    color: #95afc0;
    opacity: 0.55;
  }


`;
