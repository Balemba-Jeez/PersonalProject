import styled from 'styled-components';


export const GraphContainer = styled.div`
  background: rgba(249, 249, 249);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 1px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  padding-bottom: 0px
`;
