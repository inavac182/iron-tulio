import React from 'react';

class NewProjectForm extends React.Component {
    state = {
        projectName: ''
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addProject = e => {
        e.preventDefault();
        const projectName = this.state.projectName;
        this.props.addProject(projectName);
        this.setState({
            projectName: ''
        });
    }

    render() {
        return (
            <div className='inline-form new-project-container'>
                 <form onSubmit={this.addProject}>
                     <div className='input-row'>
                        <label htmlFor='board-name' className='visuallyhidden'> New project</label>
                        <input value={this.state.projectName}
                            onChange={this.updateInput}
                            type='text'
                            name='projectName'
                            id='project-name'
                            placeholder='New project name' />
                    </div>
                </form>
            </div>
        )
    }
}

export default NewProjectForm;
