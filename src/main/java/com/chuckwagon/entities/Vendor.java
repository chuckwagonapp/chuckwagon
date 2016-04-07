package com.chuckwagon.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Created by branden on 4/5/16 at 22:03.
 * This class is meant to contain a food truck
 *
 */
@Entity
public class Vendor {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false, name = "vendor_name")
    private String vendorName;

    @Column(nullable = false, name = "vendor_password_hashed")
    private String password;

    @Column( name = "contact_first_name")
    private String contactFirstName;

    @Column( name = "contact_last_name")
    private String contactLastName;

    @Column( name = "contact_email")
    private String contactEmail;

    @Column( name = "bio")
    private String bio;

    @Column( name = "profile_picture")
    private String profilePictureString;

    @Transient
    @JsonIgnore
    private MultipartFile profilePicture;  //this stays out of DB Json.

    @Column(name = "created")
    private LocalDateTime created;

    @Column(name = "active")
    private boolean isActive;

    public Vendor() {
    }

    public Vendor(String vendorName, String password) {
        this.vendorName = vendorName;
        this.password = password;
    }


    public Integer getId() {
        return id;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getContactFirstName() {
        return contactFirstName;
    }

    public void setContactFirstName(String contactFirstName) {
        this.contactFirstName = contactFirstName;
    }

    public String getContactLastName() {
        return contactLastName;
    }

    public void setContactLastName(String contactLastName) {
        this.contactLastName = contactLastName;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public MultipartFile getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(MultipartFile profilePicture) {
        this.profilePicture = profilePicture;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getProfilePictureString() {
        return profilePictureString;
    }

    public void setProfilePictureString(String profilePictureString) {
        this.profilePictureString = profilePictureString;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }
}