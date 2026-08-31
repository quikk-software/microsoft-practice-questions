---
title: "Apply Power Fx formulas to canvas app controls"
url: "https://learn.microsoft.com/en-us/training/modules/customize-apps-in-powerapps/3-get-started-with-functions"
uid: "learn-bizapps.powerapps-customize.3-powerapps-functions"
module: "customize-apps-in-powerapps"
moduleTitle: "Customize a canvas app in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Apply Power Fx formulas to canvas app controls

Every property of every control in a canvas app can accept a Power Fx formula. Most of the time, a label's **Text** property holds a simple field reference like `ThisItem.'Machine Name'`, but you can use any formula that returns the right data type. That's what makes Power Apps controls behave dynamically rather than just displaying static values.

Two functions are useful for controlling how gallery items look:

*   `Text(Value, FormatString)` converts a number or date into a formatted string. You use this to add currency symbols, decimal places, or date patterns to values that are stored as plain numbers in your data source.
*   `ColorValue(TextColor)` converts a text string or hex code into a **Color** value that Power Apps can apply to a control's **Color**, **Fill**, or **BorderColor** property. Storing colors as text in Dataverse and reading them with `ColorValue()` lets you drive the visual style of your controls directly from your data.

In this unit, you apply both functions in the Contoso Coffee Machines gallery: `Text()` to display the machine price as a formatted currency value, and `ColorValue()` to colorize the machine type label based on each record's **Primary Color** field.

To follow along, open your Contoso Coffee Machines app in Power Apps Studio and make sure you're on the Catalog Screen.

1.  Select "Catalog Screen" from the **Tree view** panel.
    
    Note
    
    You can also switch screens from the drop-down menu in the lower corner of the current display screen. If you select the drop-down, the screen you're currently on will have a check mark next to it and be highlighted dark gray.
    
2.  Select your Gallery to expand it and then select the ellipsis next to the **Subtitle1** control. Select **Copy>** and then **Copy**. (Alternatively, you can right select the **Subtitle1** control and select **Copy>** and then **Copy**.)
    
    [![Screenshot of the copy selection in the menu for Subtitle1.](media/copy-control.png)](media/copy-control.png#lightbox)
    
3.  Select the ellipsis next to **Subtitle1** again, and select paste.
    
    [![Screenshot of the paste selection in the menu for Subtitle1.](media/paste-control.png)](media/paste-control.png#lightbox)
    
4.  This will create a duplicate over **Subtitle1** named **Subtitle1\_1**. Select the new subtitle and drag it below **Subtitle1**.
    
5.  Select **Subtitle1** under the gallery in the **Tree View**, select it, and set the **Text** property to ThisItem.'Machine Price'.
    
6.  To add the currency symbol for US dollars, set the Text property to:
    
    `Text(Value(ThisItem.'Price'), "$ ##.00")`
    
    Remember the order of mathematical operations when using a formula, anything inside of parenthesis occurs first. Our formula is taking the value of 'Price', since our data table had it entered as Text, we're declaring it as numeric by wrapping it in the Value() function. Then we're formatting the result as Text adding the dollar sign along with number and then cents values, even if the value in cents is zero.
    
    Note
    
    If your formula returns an error, your Power Apps environment may use a comma as the decimal separator (common in regions like France or Spain). In that case, use a semicolon as the list separator and a comma as the decimal: `Text(Value(ThisItem.'Price'); "$ ##,00")`. The dot in `ThisItem.'Price'` is always a dot regardless of region — only the separators inside the format string change.
    
7.  Now let's change the **Color** property of our **Subtitle1\_1** label in our gallery. Select the **Subtitle1\_1** control and look for the **Text** property, which displays ThisItem.Type.
    
8.  Find the **Color** property for Subtitle1\_1. You'll see that it displays "RGBA(0, 0, 0, 1)". Just below the formula input field, Power Apps shows a formula showing **RGBA(0, 0, 0, 1) =** and a square that is filled in as black. It also declares that the **Data type** is **Color**.
    
9.  Let's change the **Color** property of the **Subtitle1\_1** label to **Color.Purple**. You might have noticed that as soon as you typed the word "Color", Power Apps began automatically suggesting possible values for the rest of that field below the formula bar. In this syntax, Power Apps recognizes all the available HTML colors.
    
    Note
    
    Some fields, like Color fields, only show the complete formula value when you select inside of the formula input field. When entering a color value, you must include all the formula pieces so that Power Apps understands the input. In this case the formula must be **Color.Purple**.
    
10.  Now, briefly glance to the right of the gallery at your form control (without selecting it) and notice that we have a field titled "Primary Color". Our data is written so that we can use this field's value in our formula. In the Color property field for your Subtitle1\_1 label, change your input to the following formula:
     
     `ColorValue(ThisItem. 'Primary Color')`
     
     Did you notice that now the color of the text in the **Subtitle1\_1** label matches the Coffee Machine's **Primary Color**? Power Apps can use the **ColorValue** formula to change the text name of a color into a color value. You can see just below the formula bar that Power Apps displays the data type as **Color**, and it changes the color for all the gallery items based on the machine's primary color.
     
     [![Screenshot of the properties.](media/properties.png)](media/properties.png#lightbox)
     
11.  Next, we add some headers to the new screens we created. To do that, we copy some controls from our Catalog screen and paste them on the new screens. Holding down the **Shift** key, select the **Rectangle1** and **Label1** controls from the top of your "Catalog Screen" (you can also select them from the **Tree view**). Right select and select "Copy" or use your Ctrl + C keys to copy the controls onto your device's clipboard.
     
     Tip
     
     There's some nice functionality when you 'Right select' a control or multiple selected controls. These features pop up on your screen next to selected controls. Beyond _Cut_ and _Copy_ you can also Group, Reorder, Align, or add comments (for other users). Depending on the control type you see features such as Font, Size, Color, and Fill.
     
     [![Screenshot of selecting Label1 and Rectangle1 then right clicking to copy.](media/copy-controls.png)](media/copy-controls.png#lightbox)
     
12.  Now, select the "Home Screen" and paste the two controls there. Reposition them so they're both centered at the top of the screen.
     
13.  Next, select the "Admin Screen" and repeat the paste. Also reposition the controls again.
     
14.  Next, using the **Text** property of the label controls that we inserted, we change the name to reflect the screen names. Select the label control in the header of your "Admin Screen". Remember that all a label control needs is text. Input the following into the Text property of your header label control:
     
     `'Admin Screen'.Name`
     
     Tip
     
     You may have noticed that as you began typing 'Admin Screen', Power Apps displayed some potential information from the 'Admin Screen' that you could use as text in this label. Labels are a vitally important control to add to your app when you're developing it because they can display information that you might not see otherwise. You can add/remove them from your app as required.
     
     [![Screenshot of renaming the header label to the screen's name property.](media/screen-name.svg)](media/screen-name.svg#lightbox)
     
15.  We simply used the **Name** property from our 'Admin Screen'. Let's do the same now with the Home screen by entering the following in the Text formula:
     
     `'Home Screen'.Name`
     

Our app is taking shape now as we enhance the UX by using functions with our control formulas.
