import React from 'react';



const VisualAvatar = ({size = 1, novistos = 0}) => {

    const styleOut = {
        width: `${50*size}px`,
        height: `${50*size}px`
    }

    const styleHead = {
        width: `${20*size}px`,
        height: `${20*size}px`
    };

    const styleBody = {
        width: `${35*size}px`,
        height: `${30*size}px`
    }
    const pos = novistos.toString().length <= 3 ? novistos.toString().length * 3 : 10; 
    const badgeStyle = {
        top: `-${pos}px`,
        right: `-${pos}px`
    }

    return (
        <div className="avatar">
            <div className='avatarOut' style={styleOut}>
                <div className='avatarHead' style={styleHead}></div>
                <div className='avatarTrunk' style={styleBody}></div>
            </div>
            {novistos > 0 
                ? <span className="badge" style={badgeStyle}>{novistos}</span>
                : null
            }
        </div>
    );
}

export default VisualAvatar;