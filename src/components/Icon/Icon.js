import { EditIcon } from '../../assets/icons';

const Icon = ({ icon, onClick }) => {
  const renderIcon = () => {
    if (icon === 'edit') {
      return <EditIcon />;
    }

    return <></>;
  }

  return (
    <div onClick={onClick}>
      {renderIcon()}
    </div>
  )
}

export default Icon;
