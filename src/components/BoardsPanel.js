import React, { Fragment } from 'react';
import Header from './common/Header';
import NewBoardForm from './boards/NewBoardForm.js';
import ProjectsList from './projects/ProjectsList.js';
import BoardsList from './boards/BoardsList.js';
import NewProjectForm from './projects/NewProjectForm.js';
import { firebaseApp } from '../base';

class BoardsPanel extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            projects: {},
            boards: {}
        }
    }

    addProject = projectName => {
        const db = firebaseApp.firestore();

        db.collection('projects').add({
            name: projectName,
            creator: this.props.user.uid
        });
    }

    addBoard = boardName => {
        const db = firebaseApp.firestore();

        db.collection('boards').add({
            name: boardName,
            theme: 'purple',
            project: this.props.selectedProject,
            creator: this.props.user.uid
        });
    }

    render() {
        if (!this.props.user) {
            return null;
        }

        return (
            <Fragment>
                <Header user={this.props.user}/>
                <div id='user-boards' className='jumbox colored'>
                    <div id='projects-area'>
                        <NewProjectForm
                            addProject ={this.addProject} />
                        <ProjectsList
                            projects={this.props.projects} />
                    </div>
                    <div id='boards-area'>
                        <NewBoardForm
                            addBoard ={this.addBoard} />
                        <BoardsList
                            boards={this.props.boards} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default BoardsPanel;
