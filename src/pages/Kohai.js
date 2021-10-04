import React from "react";
import { Cntainer, Grid, Box, Button, Container } from "@material-ui/core";
import { Avatar, Typography } from "@mui/material";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      ...(theme.direction === "rtl" && {
        paddingLeft: "0 !important",
      }),
      ...(theme.direction !== "rtl" && {
        paddingRight: undefined,
      }),
    },
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } =
      this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: "inherit",
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const defaultTheme = createTheme();
const VirtualizedTable = withStyles(styles, { defaultTheme })(
  MuiVirtualizedTable
);

// ---

const senpaiList = [
  ["senpai1", "title"],
  ["senpai2", "title"],
  ["test", "title"],
  ["元後輩", "title"],
  ["パイセン", "title"],
  ["senpai1", "title"],
  ["senpai2", "title"],
  ["test", "title"],
  ["元後輩", "title"],
  ["パイセン", "title"],
  ["senpai1", "title"],
  ["senpai2", "title"],
  ["test", "title"],
  ["元後輩", "title"],
  ["パイセン", "title"],
  ["senpai1", "title"],
  ["senpai2", "title"],
  ["test", "title"],
  ["元後輩", "title"],
  ["パイセン", "title"],
];

function createData(id, Lesson, Title) {
  return { id, Lesson, Title };
}

const rows = [];

for (let i = 0; i < senpaiList.length; i += 1) {
  const selection = senpaiList[i];
  rows.push(createData(i, ...selection));
}
console.log(rows);

function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: "50%", width: "100%" }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 270,
            label: "Lesson",
            dataKey: "Lesson",
          },
          {
            width: 250,
            label: "Title",
            dataKey: "Title",
          },
        ]}
      />
    </Paper>
  );
}

const Kohai = () => {
  return (
    <Grid
      className="main"
      container
      xs={12}
      style={{
        height: "100vh",
        marginTop: "10px",
      }}
    >
      <Grid
        className="left"
        item
        xs={4}
        style={{
          height: "95vh",
          backgroundColor: " #707070",
          borderRight: "#616161 1rem solid",
          borderLeft: "#616161 1rem solid",
        }}
      >
        <Typography style={{ fontSize: "25px", color: "white" }}>
          素晴らしい後輩
        </Typography>
        <Grid
          className="avatar-holder"
          container
          alignItems="center"
          justify="center"
          style={{
            height: "25vh",
          }}
        >
          <Grid>
            <Avatar
              className="kohai-photo"
              alt="kohai"
              src="https://www.sacmag.com/wp-content/uploads/sites/50/2020/12/HI_RES_FIN_IMG_8626.jpg"
              sx={{ width: 150, height: 150 }}
            />
          </Grid>
        </Grid>
        <Grid class="detail" style={{ marginLeft: "10px" }}>
          <Typography
            style={{ textAlign: "left", fontSize: "20px", color: "white" }}
          >
            Location: Tokyo
          </Typography>
          <Typography
            style={{ textAlign: "left", fontSize: "20px", color: "white" }}
          >
            Email: sample@gmail.com
          </Typography>
          <Typography
            style={{ textAlign: "left", fontSize: "20px", color: "white" }}
          >
            Bio: Art lover
          </Typography>
        </Grid>
      </Grid>
      <Grid
        className="right"
        xs={8}
        style={{
          height: "95vh",
          backgroundColor: "#707070",
          borderRight: "#616161 1rem solid",
        }}
      >
        <ReactVirtualizedTable />
        <Grid container xs={12} style={{ borderRadius: "4px", height: "50%" }}>
          <Grid
            item
            style={{ borderRadius: "4px", width: "50%", height: "50%" }}
          >
            <img
              height="100%"
              width="100%"
              alt="sample"
              src="https://images.freeimages.com/images/large-previews/bd7/falloxbow-1058032.jpg"
            />
          </Grid>
          <Grid
            item
            style={{ borderRadius: "4px", width: "50%", height: "50%" }}
          >
            <img
              height="100%"
              width="100%"
              alt="sample"
              src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1672&q=80"
            />
          </Grid>
          <Grid
            item
            style={{ borderRadius: "4px", width: "50%", height: "50%" }}
          >
            <img
              height="100%"
              width="100%"
              alt="sample"
              src="https://images.unsplash.com/photo-1581016327131-6cf17ab1f2c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            />
          </Grid>
          <Grid
            item
            style={{ borderRadius: "4px", width: "50%", height: "50%" }}
          >
            <img
              height="100%"
              width="100%"
              alt="sample"
              src="https://images.unsplash.com/photo-1547476547-82f7fbe9988f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1752&q=80"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Kohai;
