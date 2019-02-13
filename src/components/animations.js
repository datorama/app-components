import {css} from 'styled-components';

const delta = "20px";

export const fade = css`
	opacity: 0;
  visibility: hidden;
  animation: 500ms ease-out 0s 1 fade forwards;

  @keyframes fade {
    100% {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const fadeOut = css`
	opacity: 1;
  visibility: visible;
  animation: 500ms ease-out 0s 1 fadeOut forwards;

  @keyframes fadeOut {
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

export const fadeDown = css`
	opacity: 0;
  visibility: hidden;
  animation: 500ms ease-out 0s 1 fadeDown forwards;
  transform: translate(0, -${delta});

  @keyframes fadeDown {
    100% {
      opacity: 1;
      visibility: visible;
      transform: translate(0, 0);
    }
  }
`;

export const fadeUpExit = css`
	opacity: 1;
  animation: 500ms ease-out 0s 1 fadeUp forwards;

  @keyframes fadeUp {
    100% {
      opacity: 0;
      visibility: hidden;
      transform: translate(0, -${delta});
    }
  }
`;

export const fadeUp = css`
	opacity: 0;
  visibility: hidden;
  animation: 500ms ease-out 0s 1 fadeUp forwards;
  transform: translate(0, ${delta});

  @keyframes fadeUp {
    100% {
      opacity: 1;
      visibility: visible;
      transform: translate(0, 0);
    }
  }
`;

export const fadeLeft = css`
	opacity: 0;
  visibility: hidden;
  animation: 500ms ease-out 0s 1 fadeLeft forwards;
  transform: translate(${delta}, 0);

  @keyframes fadeLeft {
    100% {
      opacity: 1;
      visibility: visible;
      transform: translate(0, 0);
    }
  }
`;

export const fadeRight = css`
	opacity: 0;
  visibility: hidden;
  animation: 500ms ease-out 0s 1 fadeRight forwards;
	transform: translate(-${delta}, 0);

  @keyframes fadeRight {
    100% {
      opacity: 1;
      visibility: visible;
      transform: translate(0, 0);
    }
  }
`;

export const fadeRightExit = css`
	opacity: 1;
  animation: 500ms ease-out 0s 1 fadeRightExit forwards;

  @keyframes fadeRightExit {
    100% {
      opacity: 0;
      visibility: hidden;
      transform: translate(${delta}, 0);
    }
  }
`;

export const zoomIn = css`
	opacity: 0;
  visibility: hidden;
  animation: 500ms ease-out 0s 1 zoomIn forwards;
	transform: scale(0.8);
	
  @keyframes zoomIn {
    100% {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }
`;

export const zoomOut = css`
	opacity: 1;
  visibility: visible;
  animation: 500ms ease-out 0s 1 zoomOut forwards;
	transform: scale(1);
	
  @keyframes zoomOut {
    100% {
      opacity: 0;
      visibility: hidden;
      transform: scale(0.8);
    }
  }
`;