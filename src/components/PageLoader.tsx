interface PageLoaderProps {
  text?: string;
}

const PageLoader = ({ text = 'Securing Connection' }: PageLoaderProps) => {
  return (
    <div className="loader-overlay">
      <div className="luxury-spinner"></div>
      <div className="loader-text">{text}</div>
      <div style={{ 
        position: 'absolute', bottom: '40px', opacity: 0.3, fontSize: '12px', letterSpacing: '1px' 
      }}>
        🏛️ HAKIKA PRO SECURED
      </div>
    </div>
  );
};

export default PageLoader;
