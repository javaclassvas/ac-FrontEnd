import React from "react";
import classNames from "classnames";
import styles from "components/user/user-name/user-name.module.scss";
import UserAvatar from "components/user/user-name/user-avatar";

export type TUserProps = {
  name?: string;
  big?: boolean;
};

const UserName = ({ name, big }: TUserProps): React.ReactElement => (
  <div className={classNames(styles.container, { [styles.big]: !!big })}>
    <UserAvatar name={name} big={big} />
    <div className={styles.name}>{name}</div>
  </div>
);

export default UserName;
