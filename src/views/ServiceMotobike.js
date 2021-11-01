import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  InputGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupButtonDropdown,
  Input,
  FormGroup,
} from "reactstrap";
// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Table,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  ModalTitle,
} from "react-bootstrap";
// import "../../assets/css/customSize.css"
import "../assets/css/customSizeCompany.css"

import {
  del,
  put,
  get,
  getWithParams,
  getWithToken,
  getWithTokenParams,
  putWithToken,
  postWithToken,
} from "../service/ReadAPI";
import FilterState from "./Forms/FilterState";

// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { makeStyles } from "@material-ui/core/styles";

import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
} from "@material-ui/core";
// import FormDialog from './DialogService';
function ServiceMotobike() {
  //delete modal
  const [ServiceDelete, setServiceDelete] = useState(null);
  const [modalDelete, setServiceModalDelete] = useState(false);
  const toggleDelete = () => setServiceModalDelete(!modalDelete);
  //edit modal
  const [ServiceEdit, setServiceEdit] = useState(null);
  // const [modalEdit, setServiceModalEdit] = useState(false);
  // const toggleEdit = () => setServiceModalEdit(!modalEdit);

  const [sortedField, setSortedField] = useState("Id");
  const [ascending, setAscending] = useState(true);
  //modal create
  const [modalCreate, setserviceModalCreate] = useState(false);
  const toggleCreate = () => setserviceModalCreate(!modalCreate);

  //Edit service
  const [serviceEdit, setserviceEdit] = useState(null);
  const [modalEdit, setserviceModalEdit] = useState(false);
  const toggleEdit = () => setserviceModalEdit(!modalEdit);
  //Delete service
  const [serviceDelete, setserviceDelete] = useState(null);
  const [modalserviceDelete, setserviceModalDelete] = useState(false);
  const toggleserviceDelete = () => setserviceModalDelete(!modalserviceDelete);

  //view modal
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [selectservice, setSelectservice] = useState();

  //service List
  const [useListserviceShow, setUseListserviceShow] = useState([]);
  const [useListserviceShowPage, setUseListserviceShowPage] = useState([]);
  const [serviceList, setserviceList] = useState([]);
  const [serviceListID, setserviceListID] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  const [count, setCount] = useState(1);

  // field edit
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [companyId, setCompanyID] = useState("");
  const [fieldID, setFieldID] = useState("");
  const [serviceID, setserviceID] = useState("");
  const [fieldSelect, setfieldSelect] = useState("");
  const [data1, setData1] = useState({ array: [] });
  const [FieldSelectID, setFieldSelectID] = useState(-1);

  const [listField, setListField] = useState([]);
  //filter
  const listStates = ["Đang Hoạt Động", "Sắp ra mắt", "Ngưng hoạt động"];
  const [filterState, setListFilterState] = useState(listStates);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [stateListFilter, setstateListFilter] = useState([]);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);

  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
      borderRadius: 15,
      margin: "10px 10px",
      maxWidth: " 100%",
    },
    tableHeaderCell: {
      color: "burlywood",
      fontWeight: "bold",
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark),
      backgroundColor: "gray",
      fontWeight: "700",
    },
    thmajorheaderform: {
      fontWeight: "bold",
      fontWeight: "700",
      color: theme.palette.getContrastText(theme.palette.primary.dark),
    },

    avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light),
      fontSize: "200px",
      right: "10px",
      overflow: "unset",
      borderRadius: "32%",
    },
    name: {
      fontWeight: "bold",
      color: "#1d98e0f7",
      width: '250px'
    },
    Status: {
      fontWeight: "700",
      width: "71px",
      fontSize: "0.76rem",
      color: "white",
      backgroundColor: "green",
      borderRadius: 8,
      padding: "3px 10px",
      display: "inline-block",
    },
  }));

  const classes = useStyles();
  async function handleChooseState(e, id) {
    let newListState = [];
    if (id === -1) {
      if (e.target.checked) {
        newListState = listStates.reduce(
          (state, index) => [...state, listStates.indexOf(index)],
          []
        );
      }
    } else {
      if (e.target.checked) newListState = [...stateListFilter, id];
      else newListState = stateListFilter.filter((item) => item !== id);
    }
    //console.log(newListState);
    setstateListFilter(newListState);
    getserviceList(newListState);
  }
  const myOptions = [
    "SamSung",
    "Panasonic",
    "Daikin",
    "Electrolux",
    "LG",
    "Tosiba",
    "Sharp",
    "Mishubíhi",
    "Electric",
    "Aqua",
    "Honda",
    "Yamaha",
    "Piggio",
    "Suzuki",
    "SYM",
    "Davidson",
    "Triump",
    "Harley",
    "Ducati",
    "Rinnai",
    "Giovani",
    "Faber",
    "Teka",
    "Taka",
    "Binova",
    "Paloma",
    "Sunhouse",
    "Apple",
    "Samsung",
    "Xiaomi",
    "Oppo",
    "Huawei",
    "Pixel",
    "Nokia",
    "Samsung",
    "Apple",
    "Dell",
    "Asus",
    "HP",
    "Lenovo",
    "MSI",
    "Acer",
  ];

  const dataUpdate = [
    "Tủ Lạnh",
    "Xe máy",
    "Máy Tính",
    "Xe ô tô",
    "Máy Lạnh",
    "Máy Giặt",
    "Bếp Gas",
  ];

  const initialValue = { name: "", description: "", imageUrl: "", status: "1" };
  const [searchName, setSearchName] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  console.log("field", FieldSelectID);
  // update

  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData);
    console.log(oldData);
    handleClickOpen();
  };

  function handleOnchangeSelectedAsset(e, value) {
    //console.log(e.target,value);
    setfieldSelect(e.target.fieldId);
    setFieldSelectID(value.value);
  }
  // /api/v1.0/service/{id}
  //delete fc

  //Load service
  useEffect(() => {
    getserviceList();
  }, []);
  function getserviceList(stateList) {
    let params = {};
    if (stateList && stateList.length > 0)
      params["Status"] = stateList.reduce((f, s) => `${f},${s}`);
    getWithTokenParams(
      `/api/v1.0/services`,
      params,
      localStorage.getItem("token")
    )
      .then((res) => {
        var temp = res.data.filter((x) => x.state !== "Completed");
        setserviceList(temp);
        setUseListserviceShow(temp);
        setUseListserviceShowPage(
          temp.slice(numberPage * 80 - 80, numberPage * 80)
        );
        setTotalNumberPage(Math.ceil(temp.length / 80));
        setCount(count);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListserviceShowPage(
      useListserviceShow.slice(number * 80 - 80, number * 80)
    );
    setTotalNumberPage(Math.ceil(useListserviceShow.length / 80));
  }

  const closeBtn = (x) => (
    <button
      className="btn border border-danger"
      style={{ color: "#B22222" }}
      onClick={x}
    >
      X
    </button>
  );
  // Custom state
  function displayStateName(type) {
    const stateValue = {
      1: "Đang Hoạt Động",
      0: "Sắp ra mắt",
      2: "Ngưng hoạt động",
      // 3: "Updating"
    };
    return stateValue[type] ? stateValue[type] : "";
  }
  function displayCompanyName(type) {
    const stateValue = {
      "234be13b-421b-40d9-8226-0f162dee7ac8": "Công ty điện lạnh Thành Công",
      "7e179e62-21da-45c1-afe4-114a580f0a12": "Công ty điện lạnh Long Châu",
      "404f25c6-4f40-4f83-acfd-16a0d7c2f8e9":
        "Công ty điện lạnh, điện gia dụng Thủy Tiên",
      "4bb0a83e-e9d9-47b5-8019-20c19e953181": "Công ty điện lạnh Hòa Hưng",
      "dd0b937a-8e90-4af3-bfe8-0a8cc0722f6a": "IrepairX",
      "17ab8695-daec-4ceb-9f78-07c9528c0009": "CompanyX",
    };
    return stateValue[type] ? stateValue[type] : "";
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="table">

              <div className="header-form">

                <Row>
                <p className="abc"> Xe máy</p>
                  <Col md={1}>
                    <Dropdown>
                      <Dropdown.Menu>
                        <Dropdown.Item href="/company/gas">Bếp gas</Dropdown.Item>
                        <Dropdown.Item href="/company/ServiceMotobike">Xe máy</Dropdown.Item>
                        <Dropdown.Item href="/company/refrigerator">Tủ lạnh</Dropdown.Item>
                        <Dropdown.Item href="/company/washer">Máy giặt</Dropdown.Item>
                        <Dropdown.Item href="/company/air">Máy lạnh</Dropdown.Item>
                        <Dropdown.Item href="/company/computer">Máy tính</Dropdown.Item>
                        <Dropdown.Item href="/company/car">Xe ô tô</Dropdown.Item>
                        <Dropdown.Item href="/company/Service">Tất cả</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <div className="header-body-filter">
                    
                    <Col md={3}>
                      <Row className="fixed">
                      <Form
                      onClick={(e) => {
                        // onSubmitSearch(e);
                      }}
                    >
                      <InputGroup className="fixed">
                        <Input
                          onChange={(e) => setSearchName(e.target.value)}
                          placeholder="Tìm kiếm..."
                        ></Input>
                        <Button className="dropdown-filter-css">
                          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                        </Button>
                      </InputGroup>
                    </Form>
                      </Row>
                    </Col>
                  </div>
                 
                  <Col md={8} align="right">
                    <Button
                      variant="contained"
                      className="add-major-custom"
                      color="primary"
                      onClick={() => {
                        setserviceModalCreate(true);
                      }}
                    >
                      Thêm dịch vụ
                    </Button>
                  </Col>
                </Row>
              </div>

              <Card.Body className="table">
                <Table className="table">
                  <thead>
                    <tr>
                      <th className="description" >thiết bị</th>
                      <th
                        className="description"
                        onClick={() => {
                          if (sortedField === "Username" && ascending) {
                            setSortedField("Username");
                            setAscending(false);
                          } else {
                            setSortedField("Username");
                            setAscending(true);
                          }
                        }}
                      >
                        dịch vụ cần sửa{" "}
                        {sortedField === "Username" ? (
                          ascending === true ? (
                            <FontAwesomeIcon icon={faCaretUp} />
                          ) : (
                            <FontAwesomeIcon icon={faCaretDown} />
                          )
                        ) : (
                          <FontAwesomeIcon icon={faCaretDown} />
                        )}
                      </th>

                      <th
                        className="description"
                        onClick={() => {
                          if (sortedField === "Username" && ascending) {
                            setSortedField("Username");
                            setAscending(false);
                          } else {
                            setSortedField("Username");
                            setAscending(true);
                          }
                        }}
                      >
                        Giá tiền{" "}
                        {sortedField === "Username" ? (
                          ascending === true ? (
                            <FontAwesomeIcon icon={faCaretUp} />
                          ) : (
                            <FontAwesomeIcon icon={faCaretDown} />
                          )
                        ) : (
                          <FontAwesomeIcon icon={faCaretDown} />
                        )}
                      </th>
                      <th className="description">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>



                    <tr>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Xe máy
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              XM001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Chết máy
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 0041
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>120,000đ - 320,000đ</td>

                      <td>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-436082023">
                              Edit Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-334669391">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="right\"
                        >
                          <Button
                            onClick={() => {
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>

                    <tr>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Xe máy
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              XM001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Bể hộp số
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 0042
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>100,000đ - 520,000đ</td>

                      <td>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-436082023">
                              Edit Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-334669391">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="right\"
                        >
                          <Button
                            onClick={() => {
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>

                    <tr>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Xe máy
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              XM001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Bị rồ ga
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 0043
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>100,000đ - 220,000đ</td>

                      <td>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-436082023">
                              Edit Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-334669391">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="right\"
                        >
                          <Button
                            onClick={() => {
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>

                    <tr>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Xe máy
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              XM001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Bị nóng máy
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 0044
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>120,000đ - 520,000đ</td>

                      <td>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-436082023">
                              Edit Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-334669391">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="right\"
                        >
                          <Button
                            onClick={() => {
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>

                    <tr>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Xe máy
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              XM001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Bị cháy cầu trì
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 0045
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>200,000đ - 1,000,000đ</td>

                      <td>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-436082023">
                              Edit Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-334669391">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="right\"
                        >
                          <Button
                            onClick={() => {
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Row>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <Pagination
                      aria-label="Page navigation example"
                      className="page-right"
                    >
                      <PaginationItem disabled={numberPage === 1}>
                        <PaginationLink
                          className="page"
                          previous
                          //disable={numberPage === 1 ? "true" : "false"}

                          onClick={() => {
                            if (numberPage - 1 > 0) {
                              onClickPage(numberPage - 1);
                            }
                          }}
                        >
                          Previous
                        </PaginationLink>
                      </PaginationItem>
                      {numberPage - 1 > 0 ? (
                        <PaginationItem>
                          <PaginationLink
                            className="page"
                            onClick={() => {
                              onClickPage(numberPage - 1);
                            }}
                          >
                            {numberPage - 1}
                          </PaginationLink>
                        </PaginationItem>
                      ) : (
                        ""
                      )}
                      <PaginationItem active>
                        <PaginationLink className="page-active">
                          {numberPage}
                        </PaginationLink>
                      </PaginationItem>
                      {numberPage + 1 <= totalNumberPage ? (
                        <PaginationItem>
                          <PaginationLink
                            className="page"
                            onClick={() => {
                              onClickPage(numberPage + 1);
                            }}
                          >
                            {numberPage + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ) : (
                        ""
                      )}
                      {numberPage + 2 <= totalNumberPage ? (
                        <PaginationItem>
                          <PaginationLink
                            className="page"
                            onClick={() => {
                              onClickPage(numberPage + 2);
                            }}
                          >
                            {numberPage + 2}
                          </PaginationLink>
                        </PaginationItem>
                      ) : (
                        ""
                      )}

                      <PaginationItem disabled={numberPage === totalNumberPage}>
                        <PaginationLink
                          className="page"
                          next
                          //disable={numberPage === totalNumberPage ? true : false}
                          onClick={() => {
                            if (numberPage + 1 <= totalNumberPage) {
                              onClickPage(numberPage + 1);
                            }
                          }}
                        >
                          Next
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modalserviceDelete} toggle={toggleserviceDelete}>
        <ModalHeader style={{ color: "#1bd1ff" }}>
          Xóa dịch vụ cần sửa
        </ModalHeader>
        <ModalBody>Bạn có muốn xóa dịch vụ cần sửa này?</ModalBody>
        <ModalFooter>
          <Button
            style={{ color: "white", backgroundColor: "brown" }}
            onClick={toggleserviceDelete}
          >
            Hủy xóa
          </Button>
          <Button onClick={toggleserviceDelete}>Xóa</Button>{" "}
        </ModalFooter>
      </Modal>

      <Modal
        className="modalCreatene"
        isOpen={modalCreate}
        toggle={toggleCreate}
        centered
      >
        <ModalHeader style={{ color: "#1bd1ff" }}>
          <ModalTitle>Tạo mới một dịch vụ cần sửa</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="mb-2">
              <Form.Label>Tên dịch vụ cần sửa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên dịch vụ cần sửa"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="mb-2">
              <Form.Label>dịch vụ</Form.Label>
              <Form.Control
                type="text"
                placeholder="dịch vụ chi tiết"
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ color: "white", backgroundColor: "brown" }}
            onClick={toggleCreate}
          >
            Hủy tạo
          </Button>
          <Button onClick={toggleCreate}>Lưu dịch vụ</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalEdit} toggle={toggleEdit} centered>
        <ModalHeader style={{ color: "#1bd1ff" }}>
          <ModalTitle>Bạn muốn cập nhật?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Label>dịch vụ cần sửa </Form.Label>
            <FormGroup className="mb-2">
              <Autocomplete
                options={dataUpdate}
                Selection
                style={{ width: 500 }}
                value={"Tủ Lạnh"}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Lựa chọn dịch vụ cần sửa"
                    variant="standard"
                  // placeholder="hãng sản phẩm"
                  />
                )}
              />
            </FormGroup>

            <FormGroup className="mb-2">
              <Form.Label>dịch vụ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                as="textarea"
                value="Chuyên Sửa Các dịch vụ liên quan tới tủ lạnh"
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ color: "white", backgroundColor: "brown" }}
            onClick={toggleEdit}
          >
            Hủy cập nhật
          </Button>
          <Button onClick={toggleEdit}>Cập nhật</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalStatus} toggle={toggleDetails}>
        <ModalHeader
          toggle={toggleDetails}
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDetails)}
        >
          Detailed service information
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col></Col>
            <Col md={3}>Name</Col>
            <Col md={8}>
              {selectservice !== undefined ? selectservice.ServiceName : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Company</Col>
            <Col md={8}>
              {selectservice !== undefined
                ? displayCompanyName(selectservice.CompanyId)
                : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Description</Col>
            <Col md={8}>
              {selectservice !== undefined ? selectservice.Description : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Price</Col>
            <Col md={8}>
              {selectservice !== undefined ? selectservice.Price : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Picture</Col>
            <Col md={8}>
              {selectservice !== undefined ? (
                <img className="text-left-topic" src={selectservice.ImageUrl} />
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>State</Col>
            <Col md={8}>
              {selectservice !== undefined
                ? displayStateName(selectservice.Status)
                : ""}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ServiceMotobike;
