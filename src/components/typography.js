import {css} from 'styled-components';

export const headline = css`
	font-size: 34px;
	font-weight: 300;
	color: ${({theme}) => theme.p600};
`;

export const subHeadline = css`
	font-size: 18px;
	font-weight: 600;
	color: ${({theme}) => theme.p600};
`;

export const p = css`
	font-size: 14px;
	font-weight: 400;
	color: ${({theme}) => theme.p600};
`;

export const pBold = css`
	font-size: 14px;
	font-weight: 600;
	color: ${({theme}) => theme.p600};
`;

export const pLink = css`
	font-size: 14px;
	font-weight: 600;
	color: ${({theme}) => theme.p400};
`;

export const pNote = css`
	font-size: 14px;
	font-weight: 400;
	color: ${({theme}) => theme.p300};
`;

export const pItalic = css`
	font-size: 14px;
	font-weight: 400;
	color: ${({theme}) => theme.p300};
	font-style: italic;
`;

export const sm = css`
	font-size: 12px;
	font-weight: 400;
	color: ${({theme}) => theme.p600};
`;

export const smBold = css`
	font-size: 12px;
	font-weight: 600;
	color: ${({theme}) => theme.p600};
`;

export const smLink = css`
	font-size: 12px;
	font-weight: 600;
	color: ${({theme}) => theme.p400};
`;

export const smNote = css`
	font-size: 12px;
	font-weight: 400;
	color: ${({theme}) => theme.p300};
`;

export const smItalic = css`
	font-size: 12px;
	font-weight: 400;
	color: ${({theme}) => theme.p300};
	font-style: italic;
`;

export const tooltip = css`
	font-size: 11px;
	font-weight: 400;
	color: ${({theme}) => theme.p0};
	background: ${({theme}) => theme.p400};
	padding: 4px 8px;
	border-radius: 4px;
`;