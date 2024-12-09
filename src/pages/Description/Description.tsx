import React, { useState } from 'react';
import Markdown from 'react-markdown';
import Dompurify from 'dompurify';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/theme-monokai";
import 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";


export default function Description({ descriptionText }: {descriptionText: string}) {

    const sanitizedMarkdown = Dompurify.sanitize(descriptionText);
    const [activeTab,setActiveTab] = useState('statement');
    const [leftWidth,setLeftWidth] = useState(50);
    const [isDragging,setIsDragging] = useState(false);


    const isActiveTab = (tabName: string) => {
        if(activeTab === tabName) {
            return 'tab tab-active';
        } else {
            return 'tab'
        }
    }

    const startDragging = (e: MouseEvent) => {
        setIsDragging(true);
        e.preventDefault();
    }

    const stopDragging = () => {
        if(isDragging){
            setIsDragging(false);
        }
    }

    const onDrag = (e) => {
        if(!isDragging) return;

        const newLeftWidth = (e.clientX/window.innerWidth)*100;
        if(newLeftWidth > 10 && newLeftWidth < 90 ){
            setLeftWidth(newLeftWidth);
        }
    }

    return(
      <div 
        className='flex w-screen h-screen'
        onMouseMove={onDrag}
        onMouseUp={stopDragging}
       
      >
        <div className='left-panel h-full overflow-auto' style={{width: `${leftWidth}%`}}>
            <div role="tablist" className="tabs tabs-boxed w-3/5">
                    <a onClick={() => setActiveTab('statement')} role="tab" className={isActiveTab("statement")}>Problem Statement</a>
                    <a onClick={() => setActiveTab('editorial')} role="tab" className={isActiveTab("editorial")}>Editorial</a>
                    <a onClick={() => setActiveTab('submissions')} role="tab" className={isActiveTab("submissions")}>Submissions</a>
            </div>
            <div className='markdown-viewer p-[20px] basis-1/2'>
                <Markdown>
                    {sanitizedMarkdown}
                </Markdown>

            </div>
        </div>
        <div className='divider cursor-col-resize w-[5px] bg-slate-200 h-full'  onMouseDown={startDragging}></div>
        <div className='right-panel h-full overflow-auto' style={{width: `${100-leftWidth}%`}}>
            <div className='editor-container'>
                <AceEditor
                        mode='javascript'
                        theme='monokai'
                        name='codeEditor'
                        className='editor'
                        style={{ width: '100%'}}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            showLineNumbers: true,
                            fontSize: 16
                        }}
                />
            </div>
        </div>
      </div>
    )
}