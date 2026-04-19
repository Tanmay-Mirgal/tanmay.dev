"use client";

export const PortfolioStyles = () => {
  return (
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes scan {
         0% { transform: translateY(-100%); opacity: 0; }
         10% { opacity: 1; }
         90% { opacity: 1; }
         100% { transform: translateY(400px); opacity: 0; }
      }

      @keyframes shimmer { 100% { transform: translateX(150%); } }

      .hide-scrollbar::-webkit-scrollbar { display: none; }
      
      .glitch-effect:hover { animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite; }
      @keyframes glitch {
        0% { transform: translate(0) }
        20% { transform: translate(-2px, 2px) }
        40% { transform: translate(-2px, -2px) }
        60% { transform: translate(2px, 2px) }
        80% { transform: translate(2px, -2px) }
        100% { transform: translate(0) }
      }

      .my-masonry-grid {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin-left: -32px;
        width: auto;
      }
      .my-masonry-grid_column {
        padding-left: 32px;
        background-clip: padding-box;
      }
      .my-masonry-grid_column > div {
        margin-bottom: 32px;
      }
    `}} />
  );
};
