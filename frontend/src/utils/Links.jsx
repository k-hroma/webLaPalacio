const Links = ({ children, className, url, text, newTag = false }) => {
  return (
    <div>
      <a
        href={url}
        className={className}
        text={text}
        target={newTag ? "_blank" : undefined}
        rel={newTag ? "noopener noreferrer" : undefined}
      >
        {text}
      </a>
      <span>{ children }</span>
    </div>
  )
 }

export { Links }