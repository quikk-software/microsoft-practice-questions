---
title: "Create screen navigation in a canvas app"
url: "https://learn.microsoft.com/en-us/training/modules/customize-apps-in-powerapps/2-1-create-navigation-model"
uid: "learn-bizapps.powerapps-customize.2-1-create-navigation-model"
module: "customize-apps-in-powerapps"
moduleTitle: "Customize a canvas app in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Create screen navigation in a canvas app

Most canvas apps have multiple screens: a home screen, a list or catalog screen, detail screens, and admin screens. The `Navigate()` and `Back()` functions connect them, giving users a predictable path through your app.

`Navigate(ScreenName, ScreenTransition)` switches the user to the screen you specify. The second argument controls the animation (Slide, Fade, or None), and an optional third argument lets you pass a context variable to the destination screen—useful for telling a detail screen which records to display.

`Back()` returns the user to whichever screen they navigated from. It doesn't require a parameter; Power Apps tracks the navigation history automatically. One important detail: `Back()` only works if the user arrived at the current screen via `Navigate()`. If you start previewing your app from a screen that isn't the home screen, `Back()` has no history to return to.

When a user opens your app, Power Apps displays the screen at the top of the **Tree view**, unless you define a different launch screen in the `App.StartScreen` property. For the Contoso Coffee Machines app, that means users always land on the Home Screen first.

In this unit, you add navigation buttons to the Home Screen so users can reach the Catalog Screen and Admin Screen, then add a Back button on each destination screen.

In this unit we continue to work on our Contoso Coffee Machines app. We're going to add some app screen navigation so that your user can move to the different screens of the app. When you build an app, the screen that is at the top of your **Tree view** is the screen that the app lands on, unless you deliberately define a different screen in the formula of your StartScreen for your app. In our case, the first screen someone sees when we share an app with them is our 'Home Screen'.

Follow these steps to add navigation to our app:

1.  Go to the 'Home Screen' of your app and **Insert** two button controls.
    
2.  Position them both center screen, one above the other with some space between them so that our user can't accidentally tap one while trying to tap the other. Notice how Power Apps gives you on-screen dotted line references to help you position controls with respect to other controls on the screen near them. In this case, make sure they're slightly offset so we can learn how to **Align** controls.
    
3.  Holding the Shift key, select both controls. Some controls have identical properties that are easy to align with both selected. Keep both controls selected for the next two steps.
    
4.  Select the **Align** dropdown control from the command bar and select "Align left". If you don't see the **Align** dropdown control in the command bar, you can right click (with both controls selected) and you see an **Align** option dropdown in a popup.
    
    Note
    
    The **Align** feature is a powerful way to quickly line up multiple controls at once. Another powerful feature to make a note of is the **Undo** feature which is also in the command bar just to the right of the **Back** button.
    
5.  Now look in the Properties panel on the right and find the Width and Height properties. These are numeric input fields. Input **250** for **Width** and **100** for **Height**.
    
6.  Change the **Text** property of the top button to read "View Catalog" and the **Text** property of the bottom button to read "Admin Screen".
    
    To edit the text property, you can double-click on the text of a button on the screen, or you can go to the formula field, or you can go to the Properties panel to update the text. Try all of these techniques to determine which method works best for you.
    
7.  Next, we add our first functions that enable screen navigation. The **Navigate** function has one required parameter, the screen that the app is going to switch to. When you add a **Navigate** function, you enter your screen name in single quotes, and remember that Power Apps prompts you as you type it in the formula bar. Select the "View Catalog" button, and add the following into the **OnSelect** property:
    
    `Navigate('Catalog Screen')`
    
8.  Likewise, select the button with the name "Admin Screen" and enter the following into the **OnSelect** property:
    
    `Navigate('Admin Screen')`
    
9.  Giving users the ability to navigate from the home screen will strand them on the destination screen unless we provide a way for them to get back to the home screen. You've already seen the **Navigate** function, which you could use to get your user back to the home screen, however Power Apps has a way to get back to the previous screen your user was on through the **Back** function. Go to the **Catalog Screen** and add a **Button** control.
    
10.  Drag your new **Button** to the bottom right corner of the screen and update the **Text** property to read "Back".
     
11.  Now update the **OnSelect** property of your new button to the following:
     
     `Back()`
     
     This formula returns the user to the previous screen.
     
12.  Go to your Admin Screen and repeat the two steps above.
     
13.  Now, return to your Home Screen and place the app in preview mode. Try selecting your "View Catalog" button and then using your "Back" button to return to the home page. Try the same with your Admin Screen buttons.
     

Tip

Your app will only understand Back if you first navigate to that screen through the app. If you begin to preview your app from the Catalog Screen or Admin Screen, Power Apps has no context for what screen to navigate to with the Back function. So, when you preview your app, remember to start the preview from the Home Screen.

Congratulations! You have now added basic navigation to your app. If you would like to learn more about app navigation, we'll be exploring that in the next learning module. So, after a brief knowledge check, stick with us to learn some more things you can do to take your app to the next level!
