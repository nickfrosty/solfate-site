/* eslint-disable @next/next/no-img-element */
import styles from "~/styles/article.module.css";
import ReactMarkdown from "react-markdown";

import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

/*

*/
export function ArticleContent({ content = null, className = "" }) {
  return (
    <article className={styles.article}>
      <ReactMarkdown components={{ code: CodeBlock }}>{content}</ReactMarkdown>
    </article>
  );
}

/*
  Define a custom reusable code block component
*/
const CodeBlock = (props) => {
  const { className, children } = props;
  // console.log(props);

  // trim white space and extra lines at the end
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      children[i] = children[i].trim();
    }
    // children[children.length - 1] = children[children.length - 1].trim();
  } else if (typeof children === "string") children = children.trim();

  // compute the `language`
  let language = className.slice("language-".length).toLowerCase();

  if (language === "sh") language = "bash";

  return (
    <SyntaxHighlighter
      className={className}
      style={dracula}
      language={language}
      showLineNumbers={true}
    >
      {children}
    </SyntaxHighlighter>
  );
};
