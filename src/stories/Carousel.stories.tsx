import React from 'react';
import { Carousel } from '../components/Carousel';
import { lightTheme } from '../constants/themes.constants';

export default {
  title: 'core/Carousel',
  component: Carousel,
  argTypes: {
    slides: { control: 'none' },
  },
};

const Template = (args) => {
  return <Carousel {...args} />;
};

const slideStyles = {
  background: lightTheme.p100,
  width: '90%',
  height: 300,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: lightTheme.p300,
  fontSize: 30,
};

const renderSlides = () => {
  return [1, 2, 3, 4].map((slide, index) => (
    <div key={index} style={slideStyles}>
      Slide {index}
    </div>
  ));
};

export const Primary = Template.bind({});
Primary.args = {
  minHeight: 360,
  bulletSize: 10,
  slides: renderSlides(),
};
