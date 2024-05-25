import styles from './multi-option-button.module.sass';
import { concatStyles } from '../../../utils/styles.utils';
import {UilAngleDown} from '@iconscout/react-unicons';

type ColorTypes = 'primary' | 'secondary' | 'success' | 'warning' | 'cancel'

type MultiOptionsButton = {
  children: string,
  color?: ColorTypes,
  onClick: (e: React.MouseEvent<HTMLElement>) => void,
}

export default function MultiOptionButton({children, onClick, color='primary'}: MultiOptionsButton) {
  return (
    <div className={styles['container']}>
      <div className={concatStyles(styles['button-wrapper'], styles[color])} onClick={onClick}>
        {children}
      </div>
      <div className={concatStyles(styles['menu'], styles[color])}>
        <UilAngleDown size="20" color="white" /> 
      </div>
    </div>
  );
};
