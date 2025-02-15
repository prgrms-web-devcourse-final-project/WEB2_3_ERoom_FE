import Button from "../common/Button";

const AlarmModal = () => {
  return (
    <div>
      <div>
        <span>NOTIFICATIONS</span>
      </div>
      <div>
        <Button
          text="모두읽기"
          size="sm"
          css="bg-transparent border-logo-green"
        />
      </div>
    </div>
  );
};

export default AlarmModal;
