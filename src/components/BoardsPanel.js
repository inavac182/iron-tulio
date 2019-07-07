import React, { Fragment } from 'react';
import Header from './common/Header';
import Controls from './boards/Controls.js'

class BoardsPanel extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            projects: {}
        }
    }

    componentDidMount () {
        this.setState({
            projects: this.props.projects
        });
    }

    renderUserProjects = () => {
        return (
            <ul id='projects-list'>
                {
                    Object.keys(this.state.projects).map((k, v) => {
                        return <li key={k}>{this.state.projects[k].title}</li>
                    })
                }
            </ul>
        )
    }

    render() {
        return (
            <Fragment>
                <Header user={this.props.user}/>
                <Controls />
                <div id='user-boards' className='jumbox colored'>
                    {this.renderUserProjects()}
                </div>
            </Fragment>
        )
    }
}

export default BoardsPanel;
