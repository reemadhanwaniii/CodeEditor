import React from 'react';
import Markdown from 'react-markdown';
import Dompurify from 'dompurify';

export default function Description({ descriptionText }) {

    const sanitizedMarkdown = Dompurify.sanitize(descriptionText)

    return(
        <>
          <Markdown>
            {sanitizedMarkdown}
          </Markdown>
        </>
    )
}