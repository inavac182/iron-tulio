import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faFolder } from '@fortawesome/free-solid-svg-icons';

class ProjectsList extends React.Component {
    render() {
        return (
            <ul id='projects-list'>
                {
                    Object.keys(this.props.projects).map((k, v) => {
                        return <li key={k}>
                                <a href={`/app/${k}`} className='list-link'>
                                    <FontAwesomeIcon
                                            icon={ faFolder }
                                            className='folder-icon fa-xs' />
                                    {this.props.projects[k].name}
                                    <div className='icon-container'>
                                        <FontAwesomeIcon
                                            icon={ faAngleRight }
                                            className='list-arrow fa-xs' />
                                    </div>
                                </a>
                            </li>
                    })
                }
            </ul>
        )
    }
}

export default ProjectsList;
