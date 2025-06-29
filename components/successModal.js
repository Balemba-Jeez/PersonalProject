import styled from 'styled-components';
import { useRouter } from 'next/router';

const SuccessPaymentModal = ({ onClose }) => {
  const router = useRouter();

  const handleViewOrders = () => {
    router.push('/orders');
    onClose();
  };

  const handleReturnHome = () => {
    router.push('/');
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <CheckmarkContainer>
          <CheckmarkCircle>
            <CheckmarkStem />
            <CheckmarkKick />
          </CheckmarkCircle>
        </CheckmarkContainer>
        
        <Title>Payment Successful!</Title>
        <Message>Thank you for your purchase. Your transaction has been completed.</Message>
        
        <DetailsContainer>
          <DetailItem>
            <DetailLabel>Amount Paid:</DetailLabel>
            <DetailValue>XAF{transactionDetails?.amount || '99.00'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Transaction ID:</DetailLabel>
            <DetailValue>{transactionDetails?.id || 'PAY-789456123'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Date:</DetailLabel>
            <DetailValue>{transactionDetails?.date || new Date().toLocaleDateString()}</DetailValue>
          </DetailItem>
        </DetailsContainer>
        
        <ButtonGroup>
          <PrimaryButton onClick={handleViewOrders}>
            View My Orders
          </PrimaryButton>
          <SecondaryButton onClick={handleReturnHome}>
            Return to Home
          </SecondaryButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const CheckmarkContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const CheckmarkCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #000;
  margin: 0 auto;
  position: relative;
  animation: scaleIn 0.3s ease-out;

  @keyframes scaleIn {
    from { transform: scale(0.8); }
    to { transform: scale(1); }
  }
`;

const CheckmarkStem = styled.div`
  position: absolute;
  width: 20px;
  height: 40px;
  background-color: #000;
  left: 40%;
  top: 50%;
  transform: translate(-50%, -80%) rotate(45deg);
  transform-origin: bottom right;
`;

const CheckmarkKick = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #000;
  left: 30%;
  top: 60%;
  transform: translate(-50%, -50%) rotate(-45deg);
  transform-origin: bottom left;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #000;
  font-weight: 600;
`;

const Message = styled.p`
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const DetailsContainer = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 500;
  color: #666;
`;

const DetailValue = styled.span`
  font-weight: 600;
  color: #000;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const BaseButton = styled.button`
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PrimaryButton = styled(BaseButton)`
  background-color: #000;
  color: white;

  &:hover {
    background-color: #333;
  }
`;

const SecondaryButton = styled(BaseButton)`
  background-color: white;
  color: #000;
  border: 1px solid #ddd;

  &:hover {
    background-color: #f8f8f8;
  }
`;

export default SuccessPaymentModal;