type DividerProps = {
  style?: 'dashed' | 'dotted' | 'solid' | 'rounded';
  thickness?: number;
  color?: string;
  opacity?: number;
}

export default function Divider({ style = 'solid', thickness = 1, color = '#bbb', opacity = 1 }: DividerProps) {
  const correctedOpacity = opacity < 0 
    ? 0 
    : opacity > 1
      ? 1
      : opacity   
  
    const styles = {
    borderTop: `${thickness}px ${style === 'rounded' ? 'solid' : style} ${color}`,
    opacity: correctedOpacity,
    width: '100%'
  }
  
  if(style === 'rounded'){
    styles['borderRadius'] = '5px'
  }

  return (
    <hr 
      style={styles}
    />
  )
}