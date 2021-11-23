/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Ionicons_ttf from 'react-native-vector-icons/Fonts/Ionicons.ttf';

const IconsCSS = `
@font-face {
  src: url(${Ionicons_ttf});
  font-family: Ionicons;
}
`;

const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(IconsCSS));

document.head.appendChild(style);
