import { Box } from '@mantine/core';
import * as Texts from '.';

export function Default() {
  return (
    <Box>
      <Texts.Title1>Title 1</Texts.Title1>
      <Texts.Title2>Title 2</Texts.Title2>
      <Texts.Title3>Title 3</Texts.Title3>
      <Texts.Title4>Title 4</Texts.Title4>
      <Texts.Title5>Title 5</Texts.Title5>
      <Texts.Title6>Title 6</Texts.Title6>
      <Texts.Large>Large text</Texts.Large>
      <Texts.Body>Body text</Texts.Body>
      <Texts.Small>Small text</Texts.Small>
      <Texts.Bold>Bold text</Texts.Bold>
      <Texts.Italic>Italic text</Texts.Italic>
      <Texts.Dimmed>Dimmed text</Texts.Dimmed>
    </Box>
  );
}

export default {
  title: 'Text',
};
