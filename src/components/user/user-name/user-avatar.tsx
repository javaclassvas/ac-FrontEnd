import React, { useMemo } from "react";
import classNames from "classnames";
import styles from "components/user/user-name/user-avatar.module.scss";
import { TUserProps } from "components/user/user-name/user-name";

const UserAvatar = ({ name, big }: TUserProps): React.ReactElement => {
  const avatarName = useMemo(
    () => (name ? name.substring(0, 2).toUpperCase() : ""),
    [name]
  );
  return (
    <div className={classNames(styles.avatar, { [styles.big]: !!big })}>
      {avatarName}
    </div>
  );
};

export default UserAvatar;
