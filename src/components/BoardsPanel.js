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

      getRandomColor() {
        const min = 1;
        const max = 8;
        const rand = Math.floor(min + Math.random() * (max - min));
        const colors = ['purple', 'orange', 'yellow', 'blue', 'gray', 'green', 'brown', 'red'];

        console.log('rand', rand);
        console.log('colors', colors);
        console.log('selected', colors[rand]);
        return colors[rand];
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
        const color = this.getRandomColor();

        db.collection('boards').add({
            name: boardName,
            theme: color,
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
                <div id='user-boards' className='jumbox'>
                    <div id='projects-area'>
                        <NewProjectForm
                            addProject ={this.addProject} />
                        <ProjectsList
                            projects={this.props.projects}
                            selectedProject={this.props.selectedProject} />
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
