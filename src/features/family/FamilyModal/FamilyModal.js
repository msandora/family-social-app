import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import dayjs from 'dayjs';

class PersonDialog extends Component {
  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };
  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { person } = this.props;
    const { isOpen } = this.state;

    const currentDate = dayjs().format('MMMM DD, YYYY');
		const birthDate = dayjs(person.dateOfBirth).format('MMMM DD, YYYY');
		// const deathDate = dayjs(person.dateOfDeath).format('MMMM DD, YYYY');

		const renderBirthDate = (birthDate !== currentDate) ? (
			<span><b>Born:</b> {birthDate}</span>
    ) : (
			<span><b>Birth Date:</b> Unknown</span>
		);
    const renderMaidenName = (person.maidenName !== undefined) ? (
			<span><b>Maiden Name:</b> {person.maidenName}</span>
    ) : (
			null
    );			
		const renderParents = (person.parents && person.parents.length && person.parents[0].parentName) ? ( 
			<span>{person.firstName} is the {(person.gender === 'male') ? 'son' : "daughter"} of {person.parents[0].parentName} 
				{(person.parents && person.parents.length > 1 && person.parents[1].parentName) ? 
					' and ' + person.parents[1].parentName
					: null
				}
				{(person.maidenName !== undefined) 
					? <span> {person.maidenName}.</span>
					: <span> {person.lastName}.</span>
				}			
			</span>
    ) : (
			null
    );	
    const renderSiblings = (person.siblings && person.siblings.length) ? (
			<span>
				<span>{(person.gender === 'male') ? 'He' : "She"} has {person.siblings.length} {(person.siblings.length === 1 ? 'sibling': 'siblings')}: </span>
				{person.siblings.map((item, index) => (
					(item.siblingName !== undefined) ? 
						<span key={index}>{(index ? ', ' : '') + item.siblingName}</span>
						: null
				))}.
			</span> 
		) : (
			null
    );	
    const renderChildren = (person.children && person.children.length) ? (
			<span>{person.firstName}
			{(person.spouses && person.spouses.length && person.spouses[0].spouseName) ? 
				<span> {person.spouses[0].type} {person.spouses[0].spouseName}
					<span> and had {person.children.length} {(person.children.length === 1 ? 'child': 'children')}: </span>
					{person.children.map((item, index) => (
						(item.childName !== undefined) 
							? 
							<span key={index}>{(index ? ', ' : '') + item.childName}</span>
							: null
					))}.
				</span>
				: (
					<span> had {person.children.length} {(person.children.length === 1 ? 'child': 'children')}: 
						{person.children.map((item, index) => (
							(item.childName !== undefined) 
								? 
								<span key={index}>{(index ? ', ' : '') + item.childName}</span>
								: null
						))}.
					</span>
				)
			}	
			</span> 
    ) : (
			null
    );	
		const renderBio = (person.bio !== undefined) ? (
			<span><b>Bio:</b> {person.bio}</span>
		) : (
			null
		);	
		const renderNickName = (person.nickName !== undefined) ? (
			<span><b>Nickname:</b> {person.nickName}</span>
		) : (
			null
		);	
		const renderSuffix = (person.suffix !== undefined) ? (
			<span>{person.suffix}</span>
		) : (
			null
		);	
    return (
      <Fragment>
        <Button
          onClick={this.handleOpen}
          onTouchStart={this.handleOpen}
          style={{
            overflow: 'hidden',
            minWidth: '45px',
            padding: 0,
            background: 'none',
          }}
        >
          <img
            src='/assets/user.png'
            alt='profile'
            style={{
              width: 45,
              position: 'relative',
              left: '0.5px',
              top: 1,
              borderRadius: '50%',
            }}
          />
        </Button>
        <Modal closeIcon='close' open={isOpen} onClick={this.handleClose}>
          <Modal.Header>
            <div>{person.firstName} {person.middleName} {person.lastName} {renderSuffix}</div>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {renderBirthDate && <p>{renderBirthDate}</p>}
              {renderNickName && <p>{renderNickName}</p>}
              {renderMaidenName && <p>{renderMaidenName}</p>}
              {renderParents && <p>{renderParents}</p>}
              {renderSiblings && <p>{renderSiblings}</p>}
              {renderChildren && <p>{renderChildren}</p>}
              {renderBio && <p>{renderBio}</p>}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }
}

export default PersonDialog;
