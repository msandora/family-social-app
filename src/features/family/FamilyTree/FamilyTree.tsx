import React, { useState } from 'react';
import PinchZoomPan from 'pinch-zoom-pan';
import { IFamilyNode, IFamilyExtNode } from 'relatives-tree';
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from '../../family/FamilyNode/FamilyNode';
import styles from '../FamilyTree/Family.module.css';
import nodes from '../../../app/api/family.json';
// import { useDispatch } from 'react-redux';
import { objectToArray } from '../../../app/common/util/util';
// import { listenToFamilyFromFirestore } from '../../../app/firestore/firestoreService';
// import { listenToFamily } from '../familyActions';

const myID = 'palmasandora';

const WIDTH = 70;
const HEIGHT = 110;

export default React.memo<{}>(function FamilyTree(family) {
  // const dispatch = useDispatch();

  const [menuActive] = useState(false);
  const [rootId, setRootId] = useState<string>(myID);
  // const modes = JSON.parse(JSON.stringify(family));
  //const onResetClick = useCallback(() => setRootId(myID), []);

  // console.log('modes', modes);
  // console.log('test', JSON.parse(JSON.stringify(family)));

  console.log('family', family);
  console.log('using json file', nodes);
  console.log('test', objectToArray(family));

  return (
    <>
      <div className={styles.root}>
        <PinchZoomPan
          //debug
          captureWheel
          min={0.3}
          max={2.5}
          className={`myCanvas ${styles.wrapper} ${
            menuActive ? `${styles.ADDED_CLASS}` : ''
          }`}
        >
          <ReactFamilyTree
            nodes={nodes as IFamilyNode[]}
            rootId={rootId}
            width={WIDTH}
            height={HEIGHT}
            canvasClassName={styles.tree}
            renderNode={(node: IFamilyExtNode) => (
              <FamilyNode
                key={node.id}
                node={node}
                isRoot={node.id === rootId}
                onSubClick={setRootId}
                style={{
                  top: '10px',
                  width: WIDTH,
                  height: HEIGHT,
                  transform: `translate(${node.left * (WIDTH / 2)}px, ${
                    node.top * (HEIGHT / 2)
                  }px)`,
                }}
              />
            )}
          />
        </PinchZoomPan>
        {/* {rootId !== myID && (
          <div className={styles.reset} onClick={onResetClick}>Reset</div>
          )} */}
      </div>
    </>
  );
});
