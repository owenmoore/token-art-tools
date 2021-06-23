import React, { useState, useEffect } from "react";
import { Segment, Grid, Input, Button } from "semantic-ui-react";
import { RangeStepInput } from "react-range-step-input";

import { ValueToHexPair, RandomInt } from "../helpers/token.helpers";

const HashPairSlider = (props) => {
    const [hex, setHex] = useState("");
    const [value, setValue] = useState(0);
    const [locked, setLocked] = useState(false);

    const { index, update, randomHash } = props;

    useEffect(() => {
        setHex("00");
    }, []);

    useEffect(() => {
        if (randomHash && !locked) {
            const r = RandomInt(255);
            updateValue(r);
        }
    });

    const handleChange = (e) => {
        const v = parseInt(e.target.value);
        updateValue(v);
    };

    const updateValue = (v) => {
        if (value === v) return;
        setValue(v);
        var h = ValueToHexPair(v);
        if (hex !== h) setHex(h);
        update(index, h);
    };

    const stepValue = (inc) => {
        var v = value + parseInt(inc);
        if (v > 255) {
            v = 255;
        } else if (v < 0) {
            v = 0;
        }
        updateValue(v);
    };

    return (
        <Segment inverted style={{ overflow: "auto", background: "#222", marginBottom: 10 }}>
            <Grid>
                <Grid.Column width={1}>
                    <span style={{ top: 5, position: "relative" }}>{props.index}</span>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button
                        circular
                        icon="minus"
                        size="mini"
                        onClick={() => {
                            stepValue(-8);
                        }}
                        disabled={locked}
                    />
                </Grid.Column>
                <Grid.Column width={7}>
                    <span style={{ top: 4, position: "relative" }}>
                        <RangeStepInput
                            min={0}
                            max={255}
                            step={1}
                            onChange={handleChange}
                            value={value}
                            style={{ width: "100%" }}
                            disabled={locked}
                        />
                    </span>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button
                        circular
                        icon="plus"
                        size="mini"
                        onClick={() => {
                            stepValue(8);
                        }}
                        disabled={locked}
                    />
                </Grid.Column>
                <Grid.Column width={2}>
                    <Input
                        fluid
                        maxLength="2"
                        style={{ width: 46, height: 30 }}
                        value={hex}
                        readOnly={true}
                        disabled={locked}
                    />
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button
                        size="tiny"
                        icon={locked ? "lock" : "unlock"}
                        onClick={() => {
                            setLocked(!locked);
                        }}
                        color={locked ? "red" : null}
                    />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default HashPairSlider;
