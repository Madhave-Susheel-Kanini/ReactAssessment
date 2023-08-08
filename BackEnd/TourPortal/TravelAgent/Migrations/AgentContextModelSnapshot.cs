﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TravelAgent.Data;

#nullable disable

namespace TravelAgent.Migrations
{
    [DbContext(typeof(AgentContext))]
    partial class AgentContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TravelAgent.Models.Admin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("TravelAgent.Models.Agent", b =>
                {
                    b.Property<int>("travelAgentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("travelAgentId"));

                    b.Property<int?>("AgenttravelAgentId")
                        .HasColumnType("int");

                    b.Property<string>("travelAgentEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("travelAgentGst")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("travelAgentLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("travelAgentName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("travelAgentPan")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("travelAgentPassword")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("travelAgentPhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("travelAgentStatus")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("travelAgentId");

                    b.HasIndex("AgenttravelAgentId");

                    b.ToTable("TravelAgents");
                });

            modelBuilder.Entity("TravelAgent.Models.Hotel", b =>
                {
                    b.Property<int>("hotelId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("hotelId"));

                    b.Property<string>("hotelContact")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("hotelImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("hotelLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("hotelName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("hotelPincode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("hotelSubLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("placeId")
                        .HasColumnType("int");

                    b.HasKey("hotelId");

                    b.HasIndex("placeId");

                    b.ToTable("Hotels");
                });

            modelBuilder.Entity("TravelAgent.Models.Place", b =>
                {
                    b.Property<int>("placeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("placeId"));

                    b.Property<int?>("AgenttravelAgentId")
                        .HasColumnType("int");

                    b.Property<int?>("dayCost")
                        .HasColumnType("int");

                    b.Property<string>("latitude")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("longitude")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("maxDistance")
                        .HasColumnType("int");

                    b.Property<string>("placeDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("placeImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("placeName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("route")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("spots")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("totalDays")
                        .HasColumnType("int");

                    b.Property<int?>("tourCost")
                        .HasColumnType("int");

                    b.HasKey("placeId");

                    b.HasIndex("AgenttravelAgentId");

                    b.ToTable("Places");
                });

            modelBuilder.Entity("TravelAgent.Models.Restaurant", b =>
                {
                    b.Property<int>("RestaurantId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RestaurantId"));

                    b.Property<int?>("placeId")
                        .HasColumnType("int");

                    b.Property<string>("restaurantContact")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("restaurantImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("restaurantLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("restaurantName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("restaurantPincode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("restaurantSubLocation")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RestaurantId");

                    b.HasIndex("placeId");

                    b.ToTable("Restaurants");
                });

            modelBuilder.Entity("TravelAgent.Models.Agent", b =>
                {
                    b.HasOne("TravelAgent.Models.Agent", null)
                        .WithMany("Agents")
                        .HasForeignKey("AgenttravelAgentId");
                });

            modelBuilder.Entity("TravelAgent.Models.Hotel", b =>
                {
                    b.HasOne("TravelAgent.Models.Place", "Place")
                        .WithMany("Hotels")
                        .HasForeignKey("placeId");

                    b.Navigation("Place");
                });

            modelBuilder.Entity("TravelAgent.Models.Place", b =>
                {
                    b.HasOne("TravelAgent.Models.Agent", "Agent")
                        .WithMany()
                        .HasForeignKey("AgenttravelAgentId");

                    b.Navigation("Agent");
                });

            modelBuilder.Entity("TravelAgent.Models.Restaurant", b =>
                {
                    b.HasOne("TravelAgent.Models.Place", "Place")
                        .WithMany("Restaurants")
                        .HasForeignKey("placeId");

                    b.Navigation("Place");
                });

            modelBuilder.Entity("TravelAgent.Models.Agent", b =>
                {
                    b.Navigation("Agents");
                });

            modelBuilder.Entity("TravelAgent.Models.Place", b =>
                {
                    b.Navigation("Hotels");

                    b.Navigation("Restaurants");
                });
#pragma warning restore 612, 618
        }
    }
}
