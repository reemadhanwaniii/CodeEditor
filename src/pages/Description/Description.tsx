import React, { useState,DragEvent } from 'react';
import Markdown from 'react-markdown';
import Dompurify from 'dompurify';
import AceEditor from 'react-ace';
import rehypeRaw from 'rehype-raw';

import "../../imports/AceBuildImports";

import Languages from '../../constants/Languages';
import Themes from '../../constants/Themes';

type languageSupport = {
    languageName: string,
    value: string
}


type themeStyle = {
    themeName: string,
    value: string
}

export default function Description({ descriptionText }: {descriptionText: string}) {

    const sanitizedMarkdown = Dompurify.sanitize(descriptionText);
    const [activeTab,setActiveTab] = useState('statement');
    const [testCaseTab, setTestCaseTab] = useState('input');
    const [leftWidth,setLeftWidth] = useState(50);
    const [isDragging,setIsDragging] = useState(false);
    const [language, setLanguage] = useState('javascript')
    const [theme, setTheme] = useState('monokai');


    
    const isActiveTab = (tabName: string) => {
        if(activeTab === tabName) {
            return 'tab tab-active';
        } else {
            return 'tab'
        }
    }

    const startDragging = (e: DragEvent<HTMLDivElement>) => {
        setIsDragging(true);
        e.preventDefault();
    }

    const stopDragging = () => {
        if(isDragging){
            setIsDragging(false);
        }
    }

    const onDrag = (e: DragEvent<HTMLDivElement>) => {
        if(!isDragging) return;

        const newLeftWidth = (e.clientX/window.innerWidth)*100;
        if(newLeftWidth > 10 && newLeftWidth < 90 ){
            setLeftWidth(newLeftWidth);
        }
    }

    const isInputTabActive = (tabName: string) => {
        if(testCaseTab === tabName) {
            return 'tab tab-active';
        } else {
            return 'tab';
        }
    }

    return(
      <div 
        className='flex w-screen h-[calc(100vh-57px)]'
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
                <Markdown rehypePlugins={[rehypeRaw]}>
                    {sanitizedMarkdown}
                </Markdown>

            </div>
        </div>
        <div className='divider cursor-col-resize w-[5px] bg-slate-200 h-full'  onMouseDown={startDragging}></div>
        <div className='right-panel h-full overflow-auto' style={{width: `${100-leftWidth}%`}}>
        <div className='flex gap-x-1.5 justify-start items-center px-4 py-2'>
                    <div>
                        <button className="btn btn-success btn-sm">Submit</button>
                    </div>
                    <div>
                        <button className="btn btn-warning btn-sm">Runcode</button>
                    </div>
                    <div>
                    <select 
                            className="select select-info w-full select-sm max-w-xs" 
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            
                            {Languages.map((language: languageSupport) => (
                                <option key={language.value} value={language.value}> {language.languageName} </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select 
                                className="select select-info w-full select-sm max-w-xs" 
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                            > 
                            {Themes.map((theme: themeStyle) => (
                                <option key={theme.value} value={theme.value}> {theme.themeName} </option>
                            ))}
                        </select>
                    </div>
                </div>
            <div className='editor-container'>
                <AceEditor
                        mode={language}
                        theme={theme}
                        name='codeEditor'
                        className='editor'
                        style={{ width: '100%', minHeight: '550px'}}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            showLineNumbers: true,
                            fontSize: 16
                        }}
                />
            </div>
            { /* Collapsable test case part */ }
                <div className="collapse bg-base-200 rounded-none">
                    <input type="checkbox" className="peer" /> 
                    <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                        Console
                    </div>
                    <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
                    <div role="tablist" className="tabs tabs-boxed w-3/5 mb-4">
                        <a onClick={() => setTestCaseTab('input')} role="tab" className={isInputTabActive('input')}>Input</a>
                        <a onClick={() => setTestCaseTab('output')} role="tab" className={isInputTabActive('output')}>Output</a>
                    </div>
                        
                        {(testCaseTab === 'input') ? <textarea rows={4} cols={70} className='bg-neutral text-white rounded-md resize-none'/> : <div className='w-12 h-8'></div>}
                    </div>
                </div>

        </div>
      </div>
    )
}