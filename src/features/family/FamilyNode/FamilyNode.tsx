import React from 'react';
import classNames from 'classnames';
import { IFamilyExtNode } from 'relatives-tree';
import styles from '../FamilyNode/FamilyNode.module.css';
import FamilyModal from '../FamilyModal/FamilyModal';

interface Props {
  node: IFamilyExtNode;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}

export default React.memo<Props>(function FamilyNode({
  node,
  isRoot,
  onSubClick,
  style,
}) {
  return (
    <div>
      <div className={styles.root} style={style}>
        <div
          className={classNames(
            styles.inner,
            styles[node.gender],
            isRoot && styles.isRoot
          )}
        >
          <FamilyModal
            person={{
              id: node.id,
              gender: node.gender,
              firstName: node.firstName,
              middleName: node.middleName,
              nickName: node.nickName,
              maidenName: node.maidenName,
              lastName: node.lastName,
              suffix: node.suffix,
              dateOfBirth: node.dateOfBirth,
              dateOfDeath: node.dateOfDeath,
              bio: node.bio,
              parents: node.parents,
              siblings: node.siblings,
              children: node.children,
              spouses: node.spouses,
            }}
          />
        </div>
        <div className={styles.namePlate}>
          {node.firstName ? node.firstName : node.id}
          <br /> {node.lastName}
        </div>
        {/* 
        {node.hasSubTree && (
          <div
            className={classNames(styles.sub, styles[node.gender])}
            onClick={() => onSubClick(node.id)}
          />
        )} */}
      </div>
    </div>
  );
});
