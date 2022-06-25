import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalTypography = createGlobalStyle`
html {
  ${tw`text-default`}
}
body {
  ${tw`font-default`}
}
h1 {
  ${tw`text-4xl font-black`}
}
h2 {
  ${tw`text-xl font-semibold`}
}
h3 {
  ${tw`text-base font-bold`}
}
h4 {
  ${tw`text-sm font-bold`}
}
h5 {
  ${tw`text-base font-light`}
}
h6 {
  ${tw`text-base font-light`}
}
p {
  ${tw`text-sm font-light`}
}
li {
  ${tw`text-base font-light`}
}
a {
  ${tw`text-base font-light`}
}
`;

export default GlobalTypography;
