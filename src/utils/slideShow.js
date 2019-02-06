export const getSlideShowLength = ({ dataLength, maxDisplay }) => ((dataLength < maxDisplay)
  ? dataLength
  : maxDisplay);

export const getSlideShowSettings = config => ({
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  initialSlide: 0,
  pauseOnFocus: true,
  pauseOnDotsHover: true,
  pauseOnHover: true,
  ...config,
});
