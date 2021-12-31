import React, {useLayoutEffect, useState} from 'react';
import {Segment, Grid, Button, Icon} from 'semantic-ui-react';

import {useHash} from '../../hooks/useHash';

import Title from '../copy/title.component';
import HashPairSlider from '../inputs/hashpair-slider.component';
import SetHash from '../modals/set-hash.component';
import InitAutomation from '../modals/init-automation.component';
import RunAutomation from '../modals/run-automation.component';

const LeftControls = props => {
    const [state, dispatch] = useHash();
    const [sliders, setSliders] = useState([]);

    const {isValidUrl, startAutomation, stopAutomation, progress} = props;

    useLayoutEffect(() => {
        let sliders = [];
        for (let i = 0; i < state.params.count; i++) {
            sliders.push(<HashPairSlider key={i} index={i} isValidUrl={isValidUrl} />);
        }
        setSliders(sliders);
    }, [isValidUrl]);

    const [isSetHashModalOpen, setSetHashModalState] = useState(false);

    function openSetHashModal() {
        setSetHashModalState(true);
    }

    function closeSetHashModal() {
        setSetHashModalState(false);
    }

    const [isInitAutoModalOpen, setInitAutoModalState] = useState(false);

    function openInitAutoModal() {
        setInitAutoModalState(true);
    }

    function closeInitAutoModal(r, total, wait, csv) {
        setInitAutoModalState(false);
        if (r) {
            openRunAutomationModal();
            startAutomation(total, wait, csv);
        }
    }

    const [isRunAutomationModalOpen, setRunAutomationModalState] = useState(false);

    function openRunAutomationModal() {
        setRunAutomationModalState(true);
    }

    function closeRunAutoModal() {
        setRunAutomationModalState(false);
    }

    return (
        <>
            <SetHash active={isSetHashModalOpen} close={closeSetHashModal} />
            <InitAutomation active={isInitAutoModalOpen} close={closeInitAutoModal} />
            <RunAutomation active={isRunAutomationModalOpen} close={closeRunAutoModal} progress={progress} stop={stopAutomation} />
            <Grid>
                <Grid.Column
                    style={{
                        width: 230,
                        margin: 0,
                        padding: 15,
                        paddingRight: 0,
                    }}
                >
                    <Title />
                </Grid.Column>
                <Grid.Column style={{width: 265, padding: 0, paddingTop: 25}}>
                    <Button
                        icon
                        color="red"
                        disabled={state.history.length === 0}
                        style={{float: 'right', marginLeft: 12}}
                        onClick={() => {
                            dispatch({type: 'reset'});
                        }}
                    >
                        <Icon name="x" />
                    </Button>
                    <Button
                        icon
                        color="purple"
                        disabled={state.history.length === 0}
                        style={{float: 'right', marginLeft: 12}}
                        onClick={() => {
                            dispatch({type: 'back'});
                        }}
                    >
                        <Icon name="undo" />
                    </Button>
                    <Button icon color="pink" disabled={!isValidUrl} style={{float: 'right', marginLeft: 12}} onClick={openInitAutoModal}>
                        <Icon name="cog" />
                    </Button>
                    <Button
                        icon
                        color="teal"
                        disabled={!isValidUrl}
                        style={{float: 'right', marginLeft: 12}}
                        onClick={() => {
                            openSetHashModal();
                        }}
                    >
                        <Icon name="sign-in" />
                    </Button>
                    <Button
                        icon
                        color="blue"
                        disabled={!isValidUrl}
                        style={{float: 'right'}}
                        onClick={() => {
                            dispatch({type: 'random'});
                        }}
                    >
                        <Icon name="random" />
                    </Button>
                </Grid.Column>
            </Grid>
            <Segment
                inverted
                style={{
                    marginTop: 18,
                    maxHeight: 'calc(100vh - 150px)',
                    overflow: 'auto',
                    background: '#222',
                    padding: 20,
                }}
            >
                <Segment.Group>{sliders}</Segment.Group>
            </Segment>
            <Segment
                style={{
                    padding: 0,
                    margin: 0,
                    paddingTop: 2,
                    paddingBottom: 4,
                    paddingLeft: 15,
                    marginTop: 15,
                    cursor: 'pointer',
                    userSelect: 'none',
                    background: '#CCC',
                }}
                onClick={() => {
                    navigator.clipboard.writeText(state.hash);
                }}
            >
                <span style={{fontFamily: 'monospace', fontSize: 11}}>{state.hash}</span>
                <Icon color="grey" name="copy" size="small" style={{float: 'right', marginRight: 10, marginTop: 6}} />
            </Segment>
        </>
    );
};

export default LeftControls;
