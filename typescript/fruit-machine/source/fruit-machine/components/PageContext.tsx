import React from 'react'

const PageContext = React.createContext('');
PageContext.displayName = 'PageContext';

const pages = {
    FruitMachine: 'main',
};

function PageProvider({ value, children }: { value: any, children: any }) {
    return (
        <PageContext.Provider value={value}>
            {children}
        </PageContext.Provider>
    );
}

export { PageContext, PageProvider, pages };
