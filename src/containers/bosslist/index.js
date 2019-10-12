import React from 'react';
import { ListView } from 'antd-mobile';
import BossItem from '../../components/bossitem';

const data = [
    {
        job: '前端开发工程师',
        salary: '10-20k',
        compony: 'alibaba',
        recruiter: {
            name: '张三',
            position: '前端开发主管',
            icon: 'http://image.biaobaiju.com/uploads/20180830/19/1535628120-pcjIeVWdbl.jpg',
        },
        tags: ['中关村', '3-5年', '本科'],
    },
    {
        job: 'iOS开发工程师',
        salary: '10-20k',
        compony: 'alibaba',
        recruiter: {
            name: '李四',
            position: '移动端开发主管',
            icon: 'http://img.52z.com/upload/news/image/20180925/20180925053435_28892.jpg',
        },
        tags: ['中关村', '3-5年', '本科'],
    },
    {
        job: '前端开发工程师',
        salary: '10-20k',
        compony: 'alibaba',
        recruiter: {
            name: '张三',
            position: '前端开发主管',
            icon: 'http://tx.haiqq.com/uploads/allimg/170903/00195413M-9.jpg',
        },
        tags: ['中关村', '3-5年', '本科'],
    },
    {
        job: '前端开发工程师',
        salary: '10-20k',
        compony: 'alibaba',
        recruiter: {
            name: '张三',
            position: '前端开发主管',
            icon: 'http://img0.imgtn.bdimg.com/it/u=2654066759,2185512125&fm=26&gp=0.jpg',
        },
        tags: ['中关村', '3-5年', '本科'],
    },
];

export default class BossList extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
        };
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
            isLoading: false,
        });
    }

    renderRow = (data) => {
        return (
            <BossItem data={data} />
        )
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                // renderHeader={() => <span>header</span>}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                // renderSectionHeader={sectionData => (
                //     <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                // )}
                // renderBodyComponent={() => <MyBody />}
                renderRow={this.renderRow}
                renderSeparator={separator}
                style={{
                    height: '100%',
                    overflow: 'auto',
                }}
            //     pageSize={4}
            //     onScroll={() => { console.log('scroll'); }}
            // // scrollRenderAheadDistance={500}
            // // onEndReached={this.onEndReached}
            // // onEndReachedThreshold={10}
            />
        )
    }
}