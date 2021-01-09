/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { PureComponent } from 'react';
// import { styled } from '@superset-ui/core';
import { HelloWorldProps } from './types';
// import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

// const Styles = styled.div<HelloWorldStylesProps>`
//   background-color: ${({ theme }) => theme.colors.secondary.light2};
//   padding: ${({ theme }) => theme.gridUnit * 4}px;
//   border-radius: ${({ theme }) => theme.gridUnit * 2}px;
//   height: ${({ height }) => height};
//   width: ${({ width }) => width};
//   overflow-y: scroll;

//   h3 {
//     /* You can use your props to control CSS! */
//     font-size: ${({ theme, headerFontSize }) => theme.typography.sizes[headerFontSize]};
//     font-weight: ${({ theme, boldText }) => theme.typography.weights[boldText ? 'bold' : 'normal']};
//   }
// `;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */
const captionStyle: React.CSSProperties = {
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  maxHeight: '240px',
  overflow: 'hidden',
  position: 'absolute',
  bottom: '0',
  width: '100%',
  color: 'white',
  padding: '2px',
  fontSize: '90%',
};

const customTagStyle: React.CSSProperties = {
  wordWrap: 'break-word',
  backgroundColor: 'white',
  height: 'auto',
  fontSize: '75%',
  lineHeight: '1',
  padding: '.2em .6em .3em',
  borderRadius: '.25em',
  color: 'black',
  verticalAlign: 'baseline',
  margin: '2px',
};

export default class HelloWorld extends PureComponent<HelloWorldProps> {
  // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and componentDidMount.

  // rootElem = createRef<HTMLDivElement>();

  // componentDidMount() {
  //   const root = this.rootElem.current as HTMLElement;
  //   console.log('Plugin element', root);
  // }

  setCustomTags(i: any) {
    return i.tags.map((t: any) => {
      return (
        <div key={t.value} style={customTagStyle}>
          {t.title}:{t.value}
        </div>
      );
    });
  }

  render() {
    // height and width are the height and width of the DOM element as it exists in the dashboard.
    // There is also a `data` prop, which is, of course, your DATA 🎉
    // console.log('Approach 1 props', this.props);
    // const { data, height, width } = this.props;

    // console.log('Plugin props', this.props);
    const {
      // height,
      // width,
      data,
      // allColumnsY,
      allColumnsX,
      allColumns,
    } = this.props;
    // const imagewd = width / 3
    const style = { overflow: 'auto', height: '100%', width: '100%', display: 'inline-table' };
    var images: any[] = [];

    const getTags = (data: any) => {
      let tags: any = [];
      allColumns.forEach(col => {
        tags.push({ title: col, value: data[col] });
      });
      return tags;
    };

    data.forEach(element => {
      images.push({
        //urlofImg
        src: element[allColumnsX],
        thumbnail: element[allColumnsX],
        isSelected: false,
        tags: getTags(element),
        // thumbnailCaption: element[allColumnsY],
      });
    });
    images.map(i => {
      i.customOverlay = (
        <div style={captionStyle}>
          <div>{i.thumbnailCaption}</div>
          {i.hasOwnProperty('tags') && this.setCustomTags(i)}
        </div>
      );
      return i;
    });

    return (
      <div style={style}>
        <Gallery images={images} enableImageSelection={false} />
      </div>
    );
    // return (
    // <Styles
    //   ref={this.rootElem}
    //   boldText={this.props.boldText}
    //   headerFontSize={this.props.headerFontSize}
    //   height={height}
    //   width={width}
    // >
    //   <h3>{this.props.headerText}</h3>
    //   <pre>{JSON.stringify(data, null, 2)}</pre>
    // </Styles>
    // );
  }
}
