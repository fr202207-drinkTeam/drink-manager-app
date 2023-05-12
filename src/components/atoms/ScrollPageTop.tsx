import { useScrollTrigger,Zoom } from '@mui/material';

const ScrollPageTop=(props:any)=> {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200, // 200pxのスクロールで表示
  });

  const handleClick = (event:any) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#top');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}>
        {children}
      </div>
    </Zoom>
  );
}

export default ScrollPageTop