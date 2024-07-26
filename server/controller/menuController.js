import Menu from "../schema/menuModal.js";
import MainMenu from "../schema/mainMenuModal.js";
import SubMenu from "../schema/subMenuModal.js";
import mongoose from "mongoose";
import childMenu from "../schema/subMenuChild.js";

export const createMenu = async (req, res) => {
  try {
    const { title } = req.body;
    const titleExists = await Menu.findOne({ title });
    if (titleExists) {
      return res.status(200).json({ message: "Exists", titleExists });
    } else {
      const createdMenu = await Menu.create({ title });
      res.status(200).json(createdMenu);
    }
  } catch (error) {
    console.log("Error Occured in createMenu ", error);
  }
};

export const getMenu = async (req, res) => {
  const menus = await Menu.find().sort({ _id: -1 });
  res.status(200).json(menus);
};

export const createMainMenu = async (req, res) => {
  const { menuId, title, link, type, typeValue } = req.body;
  const mainmenu = await MainMenu.create({
    link,
    title,
    type,
    menuId,
    typeValue,
  });
  res.status(200).json("main menu created successfully");
};

export const getMainMenus = async (req, res) => {
  const mainmenus = await MainMenu.find().sort({ _id: -1 }).populate("menuId");
  res.status(200).json(mainmenus);
};

export const editMainMenu = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const { title, typeValue, type, link } = req.body;
    const updatedMenuItem = await MainMenu.findByIdAndUpdate(
      menuItemId,
      {
        $set: {
          title,
          typeValue,
          type,
          link,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Main menu item not found." });
    }
    res.json(updatedMenuItem);
  } catch (error) {
    console.log("Error in editMainMenu", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the main menu item." });
  }
};

export const getMainMenuData = async (req, res) => {
  try {
    const { id } = req.params;
    const mainMenuData = await MainMenu.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "sub menus",
          let: {
            mainMenuId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$mainMenuId", "$$mainMenuId"],
                },
              },
            },
            {
              $lookup: {
                from: "child menus",
                localField: "_id",
                foreignField: "subMenuId",
                as: "childmenus",
              },
            },
          ],
          as: "submenus",
        },
      },
    ]);

    res.status(200).json(mainMenuData);
  } catch (e) {
    res.status(400).json("something went wrong");
  }
};

export const createSubMenu = async (req, res) => {
  try {
    const { title, link, type, typeValue, mainMenuId } = req.body;
    const subs = await SubMenu.create({
      title,
      link,
      type,
      typeValue,
      mainMenuId,
    });
    res.status(200).json("Sub-menu created successfully");
  } catch (error) {
    console.log("Error in createSubMenu ", error);
  }
};

export const getSubMenus = async (req, res) => {
  const subMenus = await SubMenu.find().sort({ _id: -1 });
  res.status(200).json(subMenus);
};

export const editSubMenu = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const { title, type, link, typeValue } = req.body;
    if (title && type && link && typeValue) {
      const updatedMenuItem = await SubMenu.findByIdAndUpdate(
        menuItemId,
        {
          $set: {
            title,
            type,
            link,
            typeValue,
            UpdatedTime: Date.now(),
          },
        },
        { new: true }
      );

      if (!updatedMenuItem) {
        return res.status(404).json({ error: "sub menu item not found." });
      }

      res.json(updatedMenuItem);
    } else {
      console.log("Something is undefined in request");
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the sub menu item." });
  }
};

export const getSubMenuById = async (req, res) => {
  try {
    let { id } = req.params;
    const getData = await SubMenu.findOne({ _id: id });
    res.status(200).json(getData);
  } catch (error) {
    console.log("error in getubMenuById", error);
  }
};

// export const deleteMainMenu = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedMainMenu = await MainMenu.findByIdAndDelete(id);
//     if (!deletedMainMenu) {
//       return res.status(404).json({ message: "Main menu not found" });
//     }

//     const deletedSubMenus = await SubMenu.deleteMany({ mainMenuId: id });

//     return res.status(200).json({
//       message: "Menu and related sub menus deleted successfully",
//       mainMenu: deletedMainMenu,
//       subMenus: deletedSubMenus,
//     });
//   } catch (error) {
//     console.error("Error in deleteMainMenu ", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const deleteMainMenu = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the main menu
    const deletedMainMenu = await MainMenu.findByIdAndDelete(id);
    if (!deletedMainMenu) {
      return res.status(404).json({ message: "Main menu not found" });
    }

    // Find all submenus related to the main menu
    const subMenus = await SubMenu.find({ mainMenuId: id });
    const subMenuIds = subMenus.map((subMenu) => subMenu._id);

    // Delete the submenus
    const deletedSubMenus = await SubMenu.deleteMany({ mainMenuId: id });

    // Delete the child menus related to the submenus
    const deletedChildMenus = await childMenu.deleteMany({
      subMenuId: { $in: subMenuIds },
    });

    return res.status(200).json({
      message:
        "Menu and related sub menus and child menus deleted successfully",
      mainMenu: deletedMainMenu,
      subMenus: deletedSubMenus,
      childMenus: deletedChildMenus,
    });
  } catch (error) {
    console.error("Error in deleteMainMenu ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteSubMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubMenus = await SubMenu.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Sub menu deleted successfully",
      subMenus: deletedSubMenus,
    });
  } catch (error) {
    console.error("Error while deleteSubMenu ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTitleId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id in parms in getTitleId ", id);
    if (id) {
      const menu = await MainMenu.findOne({ _id: id });
      console.log("menu ", menu);
      if (menu) {
        const menuId = menu.menuId.toString();
        return res.status(200).json(menuId);
      } else {
        console.log("No document found with the given id");
        return res.status(500).json();
      }
    }
  } catch (error) {
    console.log("Error in getTitleId ", error);
  }
};

export const createChildMenu = async (req, res) => {
  try {
    const { subMenuId, title, link, type, typeValue } = req.body;
    console.log("req.body ", req.body);
    const mainmenu = await childMenu.create({
      link,
      title,
      type,
      subMenuId,
      typeValue,
    });
    res.status(200).json("child menu created successfully");
  } catch (error) {
    console.log("Error in createChildMenu ", error);
  }
};

export const getChildMenus = async (req, res) => {
  try {
    const subMenus = await childMenu.find().sort({ _id: -1 });
    res.status(200).json(subMenus);
  } catch (error) {
    console.log("Error in getChildMenus ", error);
  }
};

export const getChildMenuById = async (req, res) => {
  try {
    let { id } = req.params;
    const getData = await childMenu.findOne({ _id: id });
    res.status(200).json(getData);
  } catch (error) {
    console.log("error in getubMenuById", error);
  }
};

export const editChildMenu = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const { title, type, link, typeValue } = req.body;
    if (title && type && link && typeValue) {
      const updatedMenuItem = await childMenu.findByIdAndUpdate(
        menuItemId,
        {
          $set: {
            title,
            type,
            link,
            typeValue,
            UpdatedTime: Date.now(),
          },
        },
        { new: true }
      );

      if (!updatedMenuItem) {
        return res.status(404).json({ error: "child menu item not found." });
      }

      res.json(updatedMenuItem);
    } else {
      console.log("Something is undefined in request");
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the child menu item." });
  }
};

export const deleteChildMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubMenus = await childMenu.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Child menu deleted successfully",
      subMenus: deletedSubMenus,
    });
  } catch (error) {
    console.error("Error while deleteChildMenu ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateMainMenuOrder = async (req, res) => {
  const { id } = req.params;
  const { orderNo } = req.body;
  try {
    const updatedMenu = await MainMenu.findByIdAndUpdate(
      id,
      { orderNo },
      { new: true }
    );
    res.status(200).json(updatedMenu);
  } catch (error) {
    console.error("Error updating order number", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fatchOrdersNo = async (req, res) => {
  try {
    const menus = await MainMenu.find({}, "_id orderNo");
    console.log("Menus ", menus);
    const orderNumbers = menus.map((menu) => ({
      id: menu._id,
      orderNo: menu.orderNo,
    }));
    res.json(orderNumbers);
  } catch (error) {
    console.log("Error while fatchOrdersNo ", error);
    res.status(500).json({ message: "Error fetching order numbers", error });
  }
};

export const updateSubMenuOrder = async (req, res) => {
  const { id } = req.params;
  const { orderNo } = req.body;
  console.log("id ", id);
  try {
    const updatedMenu = await SubMenu.findByIdAndUpdate(
      id,
      { orderNo },
      { new: true }
    );
    res.status(200).json(updatedMenu);
  } catch (error) {
    console.error("Error updating order number", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fatchSubOrdersNo = async (req, res) => {
  try {
    console.log("Inside fatchOrdersNo");
    const menus = await SubMenu.find({}, "_id orderNo");
    console.log("Menus ", menus);
    const orderNumbers = menus.map((menu) => ({
      id: menu._id,
      orderNo: menu.orderNo,
    }));
    console.log("orderNumbers ", orderNumbers);
    res.json(orderNumbers);
  } catch (error) {
    console.log("Error while fatchOrdersNo ", error);
    res.status(500).json({ message: "Error fetching order numbers", error });
  }
};

export const getNavbarData = async (req, res) => {
  try {
    const menu = await Menu.findOne({ title: "Header" }).lean();
    const mainMenuIds = await MainMenu.find({ menuId: menu._id }, "_id title")
      .sort({ orderNo: 1 })
      .lean();
    const mainMenuPromises = mainMenuIds.map(async (mainMenu) => {
      const mainMenuObj = { ...mainMenu };
      const subMenus = await SubMenu.find({ mainMenuId: mainMenu._id })
        .sort({ orderNo: 1 })
        .lean();
      const subMenuPromises = subMenus.map(async (subMenu) => {
        const subMenuObj = { ...subMenu };
        subMenuObj.child = await childMenu.find({
          subMenuId: subMenu._id,
        }).lean();

        // console.log("subMenuObj ", subMenuObj);
        return subMenuObj;
      });

      mainMenuObj.submenus = await Promise.all(subMenuPromises);
      return mainMenuObj;
    });

    const finalData = await Promise.all(mainMenuPromises);
    // console.log("Final Data ", finalData);
    // console.log("finalData[0].submenus ", finalData[0].submenus);
    
  //   finalData.map((data,index)=>{
  //     console.log("Data is ",data);
  //     if (data.submenus[0]){
  // console.log(`finalData${index}.submenus.child[0] `, data.submenus[0].child);
  //     }
      
  //   })
    res.status(200).json(finalData);
  } catch (error) {
    console.log("Error in getNavbarData ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
