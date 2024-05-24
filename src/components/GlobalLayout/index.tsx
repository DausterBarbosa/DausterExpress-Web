import { ReactNode } from 'react';

import ApplicationAppBar from '../ApplicationAppBar';

import { styled } from '@mui/system';

const GlobalLayoutContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0 20px'
});

interface LayoutProps {
    children: ReactNode;
}

const GlobalLayout:React.FC<LayoutProps> = ({children}) => {
    return (
        <GlobalLayoutContainer>
            <ApplicationAppBar/>
            {children}
        </GlobalLayoutContainer>
    );
}

export default GlobalLayout;