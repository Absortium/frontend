/**
 *
 * Main
 *
 */

import React from "react";
import {GridList, GridTile} from "material-ui/GridList";
import {Grid, Row, Col} from "react-flexbox-grid";

const styles = {
    root: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    grid: {
        border: "4px solid"
    }
};

const tilesData = [
    {
        img: 'images/grid-list/00-52-29-429_640.jpg',
        title: 'Breakfast',
        author: 'jill111',
        featured: true,
    },
    {
        img: 'images/grid-list/burger-827309_640.jpg',
        title: 'Tasty burger',
        author: 'pashminu',
    },
    {
        img: 'images/grid-list/camera-813814_640.jpg',
        title: 'Camera',
        author: 'Danson67',
    },
    {
        img: 'images/grid-list/morning-819362_640.jpg',
        title: 'Morning',
        author: 'fancycrave1',
        featured: true,
    },
    {
        img: 'images/grid-list/hats-829509_640.jpg',
        title: 'Hats',
        author: 'Hans',
    },
    {
        img: 'images/grid-list/honey-823614_640.jpg',
        title: 'Honey',
        author: 'fancycravel',
    },
    {
        img: 'images/grid-list/vegetables-790022_640.jpg',
        title: 'Vegetables',
        author: 'jill111',
    },
    {
        img: 'images/grid-list/water-plant-821293_640.jpg',
        title: 'Water plant',
        author: 'BkrmadtyaKarki',
    },
];

const GridExample = React.createClass({
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={3}>Hello, world!</Col>
                </Row>
            </Grid>
        );
    }
});

const GridListExampleComplex = () => (
        <div style={styles.root}>
            <GridList cols={2} cellHeight={200} padding={1}>
                <GridTile style={styles.grid}
                          actionPosition="left"
                          titlePosition="top">
                    <GridTile style={styles.grid}
                              actionPosition="left"
                              titlePosition="top">
                    </GridTile>
                </GridTile>
                <GridTile style={styles.grid}
                          actionPosition="left"
                          titlePosition="top">
                </GridTile>
            </GridList>
        </div>
    )
    ;

export default GridListExampleComplex;

class Main extends React.Component {
    render() {
        return (
            <GridExample />
        );
    }
}

export default Main;
