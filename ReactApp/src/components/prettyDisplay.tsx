export const PrettyDisplay = ({ num }: { num: number }) => {
  if (num > 1000) {
    return <label>{Math.round(num / 1000)}K</label>;
  }
  if (num > 1000000) {
    return <label>{Math.round(num / 1000000)}M</label>;
  }
  return <label>{num}</label>;
};
