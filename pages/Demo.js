import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

import useJsonStore from '../../_pxp/hooks/useJsonStore';

const datos = [
    {
        id: 1,
        name: "English",
        country: "US",
        children: [
            {
                id: 4,
                name: "Spring",
                country: "Uk",
                children: [
                    {
                        id: 5,
                        name: "Otonio",
                        country: "Uk",
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: 14,
        name: "Italian",
        country: "AUS",
        children: [
            {
                id: 24,
                name: "Level A",
                country: "IND",
                children: [
                    {
                        id: 25,
                        name: "Level B",
                        country: "IND"
                    },
                    {
                        id: 26,
                        name: "Level C",
                        country: "IND"
                    },
                    {
                        id: 27,
                        name: "Level D",
                        country: "IND"
                    }
                ]
            }
        ]
    }
];

const useStyles = makeStyles({
    root: {
        height: 110,
        flexGrow: 1,
        maxWidth: 400
    }
});

const Demo = ({ config }) => {
    const classes = useStyles();

    const store = useJsonStore(config.getData);
    const { data } = store;

    const [node, setNode] = useState([]);

    useEffect(() => {
        if (data) {
            console.log('data', data);
            setNode(data[0]);
        }
    }, [data,node]);

    const renderTree = (nodes) => {

        return nodes && nodes.map((el,index) => {
            
            const handleLabel = () => {
                if(node&& child){
                    setNode(
                        [...node],
                        [node[index] = { ...node, children: [child] }]
                    );
                }
            }

            return (
                <TreeItem
                    onClick={handleLabel}
                    key={el.acountId}
                    nodeId={el.acountId.toString()}
                    label={el.acountId + " " + el.name}

                >
                    {Array.isArray(el.children) && el.children.length > 0
                        ? renderTree(el.children)
                        : null}
                </TreeItem >
            );
        });
    };

    let firstId=1;
    const [child, setchild] = useState();
    const children = {
        getData: {
            method: 'GET',
            url: `accounting/Acount/find/${firstId}`,
            params: {
                start: '0',
                limit: '10',
                sort: 'code',
                dir: 'asc',
            },
            load: true,
        },
        idStore: 'acountId',
    }
    const storeChild = useJsonStore(children.getData);
    const { data:dataChildren } = storeChild;


    useEffect(() => {
        if (dataChildren) {
            setchild(dataChildren[0]);
        }
    }, [dataChildren]);

    const handleChange=()=>{
        console.log('Hola mundo');
    }

    return (
        <TreeView
            
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={["root"]}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeToggle={handleChange()}
        >
            {renderTree(node)}
        </TreeView>
    );
}
export default Demo;
